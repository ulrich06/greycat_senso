/*
 * ************************************************************************
 *                  Université de Nice Sophia-Antipolis (UNS) -
 *                  Centre National de la Recherche Scientifique (CNRS)
 *                  Copyright © 2016 UNS, CNRS
 *
 *   This library is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU Lesser General Public
 *   License as published by the Free Software Foundation; either
 *   version 3 of the License, or (at your option) any later version.
 *
 *   This library is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *   Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public
 *   License along with this library; if not, write to the Free Software
 *   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 *
 *
 *     Author: Cyril Cecchinel – Laboratoire I3S – cecchine@i3s.unice.fr
 * ***********************************************************************
 */

package fr.i3s.modalis.cosmic.collector

import akka.actor.{Actor, ActorRefFactory}
import com.typesafe.scalalogging.LazyLogging
import spray.httpx.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, _}
import spray.routing.HttpService
import spray.routing.RejectionHandler.Default

/**
  * Actor representing a SmartCampus collector
  */

class CollectorActor extends Actor with Collector {
  implicit val system = context.system

  override def receive: Receive = runRoute(collect)

  override implicit def actorRefFactory: ActorRefFactory = context
}

/**
  * Sensor data
  *
  * @param n Name
  * @param v Value
  * @param t Timestamp
  */
case class SensorData(n: String, v: String, t: String)

/**
  * Unmarshaller for json sensor data
  */
object SensorDataJsonSupport extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val format = jsonFormat3(SensorData)
}

/**
  * Just a field
  *
  * @param value Value
  * @tparam T Type
  */
class Field[T](var value: T)

/**
  * Handle the return of callbacks
  */
class Return {
  val value = new Field(SensorData("", "", ""))
}

/**
  * Collector
  */
trait Collector extends HttpService with LazyLogging {
  val collect = {
    import SensorDataJsonSupport._
    import spray.httpx.SprayJsonSupport.sprayJsonUnmarshaller
    path("collect") {
      // Receive a SmartCampus data
      post {
        entity(as[SensorData]) { sensordata =>
          logger.info(s"Received: $sensordata")
          val returnObject = new Return
          DataStorage.update(sensordata, returnObject)
          complete(returnObject.value.value.n + " " + returnObject.value.value.v)
        }
      }
    } ~
      (path("get") & get) {
        parameters('name.as[String], 'date.as[Long] ? (System.currentTimeMillis() / 1000)) { (name, date) =>
          val returnObject = new Return
          DataStorage.get(name.replaceAll("\"", ""), date, returnObject)
          complete(returnObject.value.value.toJson.toString())
        }


      }
  }
}
