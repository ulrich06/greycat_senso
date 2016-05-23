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

package fr.i3s.modalis.cosmic

import java.io.{File, PrintWriter}

import fr.i3s.modalis.cosmic.collector.SensorData
import play.api.libs.json.{JsArray, Json}



/**
  * Just a small simulator that takes in into a SmartCampus measures file and generates
  * curl instructions to feed this application
  */
object Simulator extends App {

  val file = io.Source.fromFile("assets/TEMP_CAMPUS").mkString
  val json = Json.parse(file)
  val urlName = "http://localhost:8080/collect"
  val name = (json \ "id").get.as[String]
  val array = (json \ "values").as[JsArray]
  val data = array.value.par.map { v => SensorData(name, (v \ "value").as[String], (v \ "date").as[String]) }.seq
  val string = data.map(convert).mkString("\n")
  val writer = new PrintWriter(new File("generated/output.sh"))

  def convert(s: SensorData): String = {
    "curl -H \"Content-Type: application/json\" -X POST -d '{\"n\":\"" + s.n + "\", \"v\":\"" + s.v + "\", \"t\":\"" + s.t + "\"}' http://localhost:8080/collect"

  }

  writer.write(string)
  writer.close()


}
