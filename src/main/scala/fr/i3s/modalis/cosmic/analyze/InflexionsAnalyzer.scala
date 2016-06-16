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

package fr.i3s.modalis.cosmic.analyze

import org.joda.time.DateTime
import play.api.libs.json.{JsArray, Json}

import scala.io.Source

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 16/06/2016.
  */
object InflexionsAnalyzer {
  val ZONES = 3

  def classification(v: Int) = Math.floor(v / ZONES).toInt

  def apply(sensor: String) = {
    println(s"Requested: $sensor")
    // Retrieve inflexions for the required sensor
    val inflexions = Json.parse(Source.fromURL(URL(sensor)).mkString).asOpt[JsArray]

    if (inflexions.isDefined) {
      // Convert the timestamps into dates
      val inflexionsDates = inflexions.get.value.map { v => new DateTime(v.as[Long] * 1000L) }
      // I create a table of the number of inflexion per hour day
      val dateTable = inflexionsDates.groupBy(_.hourOfDay()).map { v => (v._1.getAsText.toInt, v._2.length) }.toList.sortBy(_._1)
      println(dateTable)
      // I sort the table by the number of inflexions (the lower the number is, the lower is the activity of the sensor)
      val groupedByInflexions = dateTable.groupBy(_._2).toList.sortBy(_._1)

      if (groupedByInflexions.size > ZONES) {
        // I cut the table in n=ZONES parts
        val cutResult = cut(groupedByInflexions, ZONES).toList
        for (i <- cutResult.indices) {
          println(s"Zone $i: ${cutResult(i).flatMap(_._2.map(_._1)).sorted}")
        }
      } else throw new IllegalArgumentException(s"ZONES argument is too high ($ZONES > ${groupedByInflexions.size})")

    } else throw new IllegalArgumentException(s"$sensor can not be parsed")

  }

  def cut[A](xs: Seq[A], n: Int) = {
    val (quot, rem) = (xs.size / n, xs.size % n)
    val (smaller, bigger) = xs.splitAt(xs.size - rem * (quot + 1))
    smaller.grouped(quot) ++ bigger.grouped(quot + 1)
  }

  def URL(sensor: String) = s"http://localhost:11000/sensors/$sensor/compression/inflexion"
}

object RunAnalyzer extends App {
  InflexionsAnalyzer("TEMP_443V")
}
