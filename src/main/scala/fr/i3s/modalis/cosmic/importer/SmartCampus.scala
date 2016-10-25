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

package fr.i3s.modalis.cosmic.importer

import fr.i3s.modalis.cosmic.collector.{SensorData, SensorDataJsonSupport}
import fr.i3s.modalis.cosmic.mwdb.DataStorage
import fr.i3s.modalis.cosmic.mwdb.returns.SensorDataReturn
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClientBuilder
import play.api.libs.json.{JsObject, Json}

import scala.collection.mutable

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 24/05/2016.
  */
object RealTimeSmartCampusImporter {

  val history: scala.collection.mutable.Map[String, String] = mutable.Map[String, String]()
  val TARGET = "http://0.0.0.0:11000/collect"
  val SLEEP = 1000

  def apply(lstSensors: List[(String, Int)]) = {
    for (sensor <- lstSensors) {
      history += ((sensor._1, "0"))

      new Thread(new Runnable {
        override def run(): Unit = {
          while (true) {
            val source = Json.parse(scala.io.Source.fromURL(PATTERN_SENSOR(sensor._1)).mkString)
            //val date = ((source \\ "values").head \ "date").as[String]
            val name = (source \ "id").as[String]
            val date = ((source \ "values").head \ "date").as[String]
            val value = ((source \ "values").head \ "value").as[String]
            if (history(name) != date) {
              DataStorage.update(SensorData(name, value, date), new SensorDataReturn)
              history(name) = date
            }
            if (sensor._2 == 0) Thread.sleep(1000) else Thread.sleep(sensor._2 * 1000)
          }

        }
      }).start()
    }
  }

  def PATTERN_SENSOR(s: String) = s"http://smartcampus.unice.fr/sensors/$s/data/last"
}

object HistorySmartCampusImporterFromURL {

  val TARGET = "http://192.168.1.18:11000/collect"
  val DATE_FORMAT = "yyyy-mm-dd kk:mm:ss"

  def apply(lstSensors: List[String], tBegin: String, tEnd: String) = {
    for (sensor <- lstSensors) {
      new Thread(new Runnable {
        override def run(): Unit = {
          val source = Json.parse(scala.io.Source.fromURL(PATTERN_SENSOR(sensor, tBegin.replace(" ", "%20"), tEnd.replace(" ", "%20"))).mkString)
          val name = (source \ "id").as[String]
          println(source)
          for (record <- (source \ "values").as[List[JsObject]]) {
            val date = (record \ "date").as[String]
            val value = (record \ "value").as[String]
            println(s"Posting $name ($value - $date)")
            RestImporter(SensorData(name, value, date))
          }
        }
      }).start()
    }
  }

  def PATTERN_SENSOR(s: String, tBegin: String, tEnd: String) = s"http://smartcampus.unice.fr/sensors/$s/data?date=$tBegin/$tEnd"
}

object HistorySmartCampusImporterFromFile {

  val DATE_FORMAT = "yyyy-mm-dd kk:mm:ss"

  def apply(pathToFile: String) = {

    val source = Json.parse(scala.io.Source.fromFile(pathToFile).mkString)
    val name = (source \ "id").as[String]
    for (record <- (source \ "values").as[List[JsObject]]) {
      val date = (record \ "date").as[String]
      val value = (record \ "value").as[String]
      RestImporter(SensorData(name, value, date))
    }
  }
}

object DoIt extends App {
  HistorySmartCampusImporterFromURL(List("TEMP_442V"), "2016-08-22 00:00:00", "2016-09-05 00:00:00")
}