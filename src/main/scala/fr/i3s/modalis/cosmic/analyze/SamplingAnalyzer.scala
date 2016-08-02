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

import fr.i3s.modalis.cosmic.mwdb.nodes.{CompressedSensorNode, SensorNode}
import org.joda.time.{DateTime, DateTimeFieldType}
import org.mwg.task.{Action, TaskContext}
import org.mwg.{Callback, Graph, Node}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 16/06/2016.
  */
object SamplingAnalyzer extends Analyzer {


  val ZONES = 3

  def classification(v: Int) = Math.floor(v / ZONES).toInt

  def apply(sensor: String, graph: Graph) = {
    println(s"Requested: $sensor")
    // Retrieve inflexions for the required sensor
    var inflexions: List[Long] = 0L :: Nil
    graph.newTask().fromIndex("nodes", s"name = $sensor").`then`(new Action {
      override def eval(context: TaskContext): Unit = context.result().asInstanceOf[Array[Node]](0).rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
        override def on(result: Array[Node]): Unit = {
          inflexions = result(0).asInstanceOf[CompressedSensorNode].getInflexions.toList
        }
      })
    }).execute()



    // Convert the timestamps into dates
    val inflexionsDates = inflexions.map { v => new DateTime(v * 1000L) }

    // Group by Year/Day of Year/Hour of day
    val inflexionsArray = inflexionsDates.groupBy(d => (d.get(DateTimeFieldType.year()), d.get(DateTimeFieldType.dayOfYear()))).map { v => v._1 -> v._2.groupBy(_.hourOfDay().getAsText.toInt) }


    // Compute the elapsed time between two inflexions
    val inflexionsWithTS = inflexionsArray.map { v => v._1 -> v._2.map { d => d._1 -> d._2.map {
      _.secondOfDay().getAsText.toLong
    }.sorted.sliding(2).map {
      case Seq(x, y, _*) => y - x
      case Seq(x) => x - d._1 * 3600
    }.toList
    }
    }

    println("InflexionsWithTS: " + inflexionsWithTS)
    //Merge the hour-sorted inflexions together
    val dtList = inflexionsWithTS.values.map {
      _.toSeq
    }.reduce(_ ++ _).groupBy(_._1).mapValues(_.map(_._2).toList.flatten)

    println("dtlist: " + dtList)
    //Compute the median value
    val minPeriod = dtList.map { v => (v._1, median(v._2).toInt, v._2.length) }.filterNot(_._2 == 0)


    (for (i <- 0 to 23) yield {
      val res = minPeriod.find(_._1 == i)
      if (res.isDefined) res.get._2 else 3600
    }).toList


  }

  def median(s: Seq[Long]) = s.sortWith(_ < _)(s.size / 2)

  def computingPeriod(zone: List[Int], inflexions: List[(Int, Int)]): Int = {
    val list = inflexions.filter(v => zone contains v._1).map {
      _._2
    }
    list.sum / list.size
  }
}
