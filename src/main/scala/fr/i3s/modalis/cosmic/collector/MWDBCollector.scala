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
import fr.i3s.modalis.cosmic.analyze.{SamplingAnalyzer, SendingAnalyzer}
import fr.i3s.modalis.cosmic.mwdb.DataStorage
import fr.i3s.modalis.cosmic.mwdb.nodes.SensorNode
import fr.i3s.modalis.cosmic.mwdb.returns._
import org.joda.time.DateTime
import org.mwg.Constants
import spray.http.HttpHeaders.RawHeader
import spray.http.MediaTypes._
import spray.httpx.SprayJsonSupport
import spray.json.{DefaultJsonProtocol, _}
import spray.routing.HttpService
import spray.routing.RejectionHandler.Default

/**
  * Actor representing a SmartCampus collector
  */

class MWDBCollectorActor extends Actor with SensorsRouting with CollectRouting with SettingsRouting {
  implicit val system = context.system

  override def receive: Receive = runRoute(sensors ~ collect ~ settings)

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

trait SettingsRouting extends HttpService with LazyLogging {
  val settings = {
    import SensorDataJsonSupport._

    get {
      path("settings" / "sensors") {
        respondWithHeader(RawHeader("Access-Control-Allow-Origin", "*")) {
          respondWithMediaType(`application/json`) {
            complete {
              val arrayReturn = new ArrayStringReturn
              arrayReturn.value.value = scala.io.Source.fromURL(s"http://localhost:${DataStorage._httpPort}/fromIndexAll(sensors)/get(name)").mkString.replace("[", "").replace("]", "").replace("\n", "").split(",")
              arrayReturn.value.value.toJson.toString()
            }
          }
        }
      }
    }
  }
}

trait SensorsRouting extends HttpService with LazyLogging {
  val sensors = {
    import SensorDataJsonSupport._
    get {
      respondWithHeader(RawHeader("Access-Control-Allow-Origin", "*")) {
        path("sensors" / Segment / "sleep") { sensor =>
          var sleepPeriod: Int = 0
          val result = SamplingAnalyzer(sensor, DataStorage.getGraph)
          val now = new DateTime(System.currentTimeMillis)
          println(result)
          val relevantHour = result.map(_._1).filter(_ < now.getHourOfDay).sorted.reverse.head
          println(relevantHour)
          val relevantValue = result.find(_._1 == relevantHour).get
          if (now.getMinuteOfHour * 60 + now.getSecondOfMinute + relevantValue._2 < 3600) {

            sleepPeriod = relevantValue._2
          }
          else {
            sleepPeriod = 3600 - (now.getMinuteOfHour * 60 + now.getSecondOfMinute)
          }
          complete("sleep=" + sleepPeriod.toString())
        } ~ path("sensors" / Segment / "sending") { sensor =>
          var sendingPeriod: Int = 0
          val result = SendingAnalyzer(sensor, DataStorage.getGraph)
          val now = new DateTime(System.currentTimeMillis)
          if (now.getMinuteOfHour * 60 + now.getSecondOfMinute + result(now.getHourOfDay) < 3600) {

            sendingPeriod = result(now.getHourOfDay)
          }
          else {
            sendingPeriod = 3600 - (now.getMinuteOfHour * 60 + now.getSecondOfMinute)
          }
          //println(result)
          //complete("sending=" + sendingPeriod.toString)

          val table = List(0, 0, 0, 0, 0, 0, 0, 1800, 1800, 1200, 1200, 1200, 900, 900, 1200, 1200, 1800, 1800, 2700, 0, 0, 0, 0, 0)
          val res = table(now.getHourOfDay).toString
          println(s"Mock: $res")
          complete(s"sending=$res")
        } ~ path("sensors" / Segment / "compression") { sensor =>
          val returnObject = new DoubleReturn
          DataStorage.getCompressionRate(sensor, returnObject)
          complete(returnObject.value.value.toString())
        } ~
          respondWithMediaType(`application/json`) {
            path("sensors" / Segment / "compression" / "inflexion" / "stats") { sensor => {
              val returnInflexions = new ArrayLongReturn
              DataStorage.getInflexions(sensor, returnInflexions)
              val values = returnInflexions.value.value.map { v => new DateTime(v * 1000L) }

              // I create a table of the number of inflexion per hour day
              val dateTable = values.groupBy(_.hourOfDay()).map { v => (v._1.getAsText.toInt, v._2.length) }.toList.sortBy(_._1)
              val res = dateTable.map(_._2)

              complete(res.toJson.toString())
            }
            } ~
              path("sensors" / Segment / "compression" / "inflexion" / "data" / Segment) { (sensor, tbegin) =>
                var timestampB: Long = 0
                try {
                  timestampB = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(tbegin).getTime / 1000
                }
                catch {
                  case e: ParseException =>

                    /** Try long input **/
                    try {
                      timestampB = tbegin.toLong
                    }
                    catch {
                      case e: NumberFormatException => complete(s"Error while parsing date $tbegin")
                    }
                }
                logger.debug(s"Retrieve inflexions values ($sensor) between $timestampB")
                val returnObject = new SensorDataReturn
                DataStorage.getInterpolated(sensor, timestampB, returnObject)
                complete(returnObject.value.value.toJson.toString())

              } ~
              path("sensors" / Segment / "compression" / "inflexion") { sensor =>
                val returnObject = new ArrayLongReturn
                DataStorage.getInflexions(sensor, returnObject)
                complete(returnObject.value.value.toJson.toString())
              } ~ path("sensors" / Segment / "compression" / "inflexion" / Segment / Segment) { (sensor, tbegin, tend) =>
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
              logger.debug(s"Retrieve inflexions ($sensor) between $timestampB/$timestampE")
              val returnObject = new ArrayLongReturn
              DataStorage.getInflexions(sensor, timestampB, timestampE, returnObject)
              complete(returnObject.value.value.toJson.toString())

            } ~ path("sensors" / Segment / "stats") { sensor =>
              complete(scala.io.Source.fromURL(s"http://localhost:${DataStorage._httpPort}/fromIndexAll(nodes)/with(name,$sensor)/traverse(${SensorNode.STATS_RELATIONSHIP})").mkString)
            } ~ path("sensors" / Segment / "activity") { sensor => {
              val returnObject = new ArrayIntReturn
              DataStorage.getActivity(sensor, returnObject)
              complete(returnObject.value.value.toJson.toString())
            }

            } ~ path("sensors" / Segment / "data" / Segment) { (sensor, date) =>
              if ("last".equals(date)) {
                val timestamp = System.currentTimeMillis() / 1000
                logger.debug(s"Retrieve $sensor @ $timestamp")
                val returnObject = new SensorDataReturn
                DataStorage.get(sensor, timestamp, returnObject)
                complete(returnObject.value.value.toJson.toString())
              } else {
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
              }
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
            }
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
          if (sensordata.t equals "0")
            DataStorage.update(sensordata.copy(t = (System.currentTimeMillis / 1000).toString), returnObject)
          else
            DataStorage.update(sensordata, returnObject)
          respondWithMediaType(`application/json`) {
            complete(returnObject.value.value.toJson.toString())
          }
        }
      }
    }
  }
}