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

import fr.i3s.modalis.cosmic.TheLabExample
import fr.i3s.modalis.cosmic.organizational.{EventBased, Periodic}
import org.joda.time.{DateTime, DateTimeFieldType}
import play.api.libs.json.{JsArray, Json}

import scala.io.Source

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 16/06/2016.
  */
object StaticAnalyzer {


  val ZONES = 3

  def classification(v: Int) = Math.floor(v / ZONES).toInt

  def apply(sensor: String) = {
    println(s"Requested: $sensor")
    // Retrieve inflexions for the required sensor
    val inflexions = Json.parse(Source.fromURL(URL(sensor)).mkString).asOpt[JsArray]

      // Convert the timestamps into dates
      val inflexionsDates = inflexions.get.value.map { v => new DateTime(v.as[Long] * 1000L) }

    val inflexionsArray = inflexionsDates.groupBy(d => (d.get(DateTimeFieldType.year()), d.get(DateTimeFieldType.dayOfYear()))).map { v => v._1 -> v._2.groupBy(_.hourOfDay().getAsText.toInt) }
    val inflexionsWithTS = inflexionsArray.map { v => v._1 -> v._2.map { d => d._1 -> d._2.map {
      _.secondOfDay().getAsText.toLong
    }.sorted.sliding(2).map {
      case Seq(x, y, _*) => y - x
      case Seq(x) => x - d._1 * 3600
    }.toList
    }
    }

    val dtList = inflexionsWithTS.values.map {
      _.toSeq
    }.reduce(_ ++ _).groupBy(_._1).mapValues(_.map(_._2).toList.flatten)


    println(dtList)

    val minPeriod = dtList.map { v => (v._1, v._2.min.toInt, v._2.length) }.filterNot(_._2 == 0)
    val minPeriodSorted = minPeriod.toList.sortBy(_._3).reverse

    minPeriodSorted


  }

  def URL(sensor: String) = s"http://localhost:11000/sensors/$sensor/compression/inflexion"

  def computingPeriod(zone: List[Int], inflexions: List[(Int, Int)]): Int = {
    val list = inflexions.filter(v => zone contains v._1).map {
      _._2
    }
    list.sum / list.size
  }

  def cut[A](xs: Seq[A], n: Int) = {
    val (quot, rem) = (xs.size / n, xs.size % n)
    val (smaller, bigger) = xs.splitAt(xs.size - rem * (quot + 1))
    smaller.grouped(quot) ++ bigger.grouped(quot + 1)
  }
}

object RunAnalyzer extends App {

  val SENSOR = "AC_443"

  /** **************************/

  val labSensor = TheLabExample.catalog.getSensor(SENSOR)

  if (labSensor.isDefined) {
    val result = StaticAnalyzer(SENSOR)

    // Compare with static perdiod if periodic sensor
    labSensor.get match {
      case x: Periodic => {

        val refPeriod = x.period
        val benefits = result.map { x => (x._1, x._2, x._3, (-(x._2.toDouble - refPeriod) / refPeriod) * 100) }
        println(benefits)
      }
      case x: EventBased => println("Event-based sensor")
    }


  }



}