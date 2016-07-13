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

import fr.i3s.modalis.cosmic.mwdb.DataStorage
import fr.i3s.modalis.cosmic.mwdb.nodes.SensorNode
import fr.i3s.modalis.cosmic.mwdb.returns.ArrayIntReturn
import org.joda.time.{DateTime, Days}
import org.mwg.task.{Action, TaskContext}
import org.mwg.{Graph, Node}

import scala.util.Try

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 16/06/2016.
  */
object SendingAnalyzer {

  def apply(sensor: String, graph: Graph) = {
    println(s"Requested: $sensor")
    // Retrieve activity for the required sensor
    val activitiesReturn = new ArrayIntReturn()
    DataStorage.getActivity(sensor, activitiesReturn)
    val activities = activitiesReturn.value.value.toList.dropRight(1)

    var timeLine: List[Long] = List[Long]()
    graph.newTask().fromIndex("nodes", s"name = $sensor").`then`(new Action {
      override def eval(context: TaskContext): Unit = {
        timeLine = context.result().asInstanceOf[Array[Node]](0).asInstanceOf[SensorNode].getTimeline.toList
      }
    }).execute()



    val nbDays = Days.daysBetween(new DateTime(timeLine.last).toLocalDate, new DateTime(timeLine.head).toLocalDate).getDays
    println(nbDays)
    //Computed sending period (rounded to higher number) for sensor, in min
    activities.map { e => Try((60.0 / (e.toDouble / nbDays.toDouble)).toInt).getOrElse(0) }

  }

}
