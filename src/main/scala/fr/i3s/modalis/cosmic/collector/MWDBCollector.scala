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

import java.text.{ParseException, SimpleDateFormat}

import akka.actor.{Actor, ActorRefFactory}
import com.typesafe.scalalogging.LazyLogging
import fr.i3s.modalis.cosmic.mwdb.DataStorage
import fr.i3s.modalis.cosmic.mwdb.nodes.SensorNode
import fr.i3s.modalis.cosmic.mwdb.returns.{ArraySensorDataReturn, SensorDataReturn}
import org.mwg.Constants
import spray.http.MediaTypes._
import spray.httpx.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, _}
import spray.routing.HttpService
import spray.routing.RejectionHandler.Default

/**
  * Actor representing a SmartCampus collector
  */

class MWDBCollectorActor extends Actor with SensorsRouting with CollectRouting {
  implicit val system = context.system

  override def receive: Receive = runRoute(sensors ~ collect)

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


trait SensorsRouting extends HttpService with LazyLogging {
  val sensors = {
    import SensorDataJsonSupport._
    get {
      respondWithMediaType(`application/json`) {
        path("sensors" / Segment / "stats") { sensor =>
          //complete(scala.io.Source.fromURL(s"http://localhost:${DataStorage._httpPort}/fromIndexAll(nodes)/with(name,$sensor)/traverse(${SensorNode.STATS_NAME})").mkString)
          complete("Not yet...")
        } ~ path("sensors" / Segment / "updates") { sensor =>
          complete(scala.io.Source.fromURL(s"http://localhost:${DataStorage._httpPort}/fromIndexAll(nodes)/with(name,$sensor)/traverse(${SensorNode.UPDATE_RELATIONSHIP})").mkString)
        } ~ path("sensors" / Segment / "usage") { sensor =>
          complete(scala.io.Source.fromURL(s"http://localhost:${DataStorage._httpPort}/fromIndexAll(nodes)/with(name,$sensor)/traverse(${SensorNode.USE_RELATIONSHIP})").mkString)
        } ~ path("sensors" / Segment / "data" / Segment) { (sensor, date) =>
          var timestamp: Long = 0
          try {
            timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date).getTime / 1000
          }
          catch {
            case e: ParseException =>

              /** Try long input **/
              try {
                timestamp = date.toLong
              }
              catch {
                case e: NumberFormatException => complete(s"Error while parsing date $date")
              }
          }
          logger.debug(s"Retrieve $sensor @ $timestamp")
          val returnObject = new SensorDataReturn
          DataStorage.get(sensor, timestamp, returnObject)
          complete(returnObject.value.value.toJson.toString())
        } ~ path("sensors" / Segment / "data" / Segment / Segment) { (sensor, tbegin, tend) =>
          var timestampB: Long = 0
          var timestampE: Long = 0
          try {
            timestampB = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(tbegin).getTime / 1000
            timestampE = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(tend).getTime / 1000
          }
          catch {
            case e: ParseException =>

              /** Try long input **/
              try {
                timestampB = tbegin.toLong
                timestampE = tend.toLong
              }
              catch {
                case e: NumberFormatException => complete(s"Error while parsing date $tbegin / $tend")
              }
          }
          logger.debug(s"Retrieve $sensor between $timestampB/$timestampE")
          val returnObject = new ArraySensorDataReturn
          DataStorage.get(sensor, timestampB, timestampE, returnObject)
          complete(returnObject.value.value.toJson.toString())

        } ~ path("sensors" / Segment / "data") { sensor =>
          val returnObject = new ArraySensorDataReturn
          DataStorage.get(sensor, Constants.BEGINNING_OF_TIME, Constants.END_OF_TIME, returnObject)
          complete(returnObject.value.value.toJson.toString())
        } ~ path("sensors" / Segment / "data" / "last") { sensor =>
          val timestamp = System.currentTimeMillis() / 1000
          logger.debug(s"Retrieve $sensor @ $timestamp")
          val returnObject = new SensorDataReturn
          DataStorage.get(sensor, timestamp, returnObject)
          complete(returnObject.value.value.toJson.toString())
        }
      }
    }
  }
}

trait CollectRouting extends HttpService with LazyLogging {
  val collect = {
    import SensorDataJsonSupport._
    import spray.httpx.SprayJsonSupport.sprayJsonUnmarshaller
    path("collect") {
      post {
        entity(as[SensorData]) { sensordata =>
          logger.info(s"[POST] $sensordata")
          val returnObject = new SensorDataReturn
          DataStorage.update(sensordata, returnObject)
          respondWithMediaType(`application/json`) {
            complete(returnObject.value.value.toJson.toString())
          }
        }
      }
    }
  }
}