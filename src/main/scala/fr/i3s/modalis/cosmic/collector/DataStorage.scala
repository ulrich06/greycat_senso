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

import java.lang.Boolean

import fr.i3s.modalis.cosmic.nodes.SmartCampusNode.SmartCampusFactory
import org.mwg._
import org.mwg.core.NoopScheduler
import org.mwg.task._

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 06/05/2016.
  */

/**
  * Sensor data storage
  */
object DataStorage {

  // The graph
  private var _graph: Graph = _

  /**
    * Initialize the data storage by creating a root node and indexes
    */
  def init(graph: Graph) = {
    _graph = graph
  }


  /**
    * Update a sensor value
    *
    * @param sensorData   SensorData object
    * @param returnObject Return of the callback
    */
  def update(sensorData: SensorData, returnObject: Return) = {

    _graph.newTask().fromIndexAll("nodes")
      .select(new TaskFunctionSelect {
        override def select(node: Node) = node.get("name").equals(sensorData.n)
      })
      .`then`(new TaskAction {
        override def eval(context: TaskContext): Unit = context.getPreviousResult.asInstanceOf[Array[Node]].headOption match {
          case Some(node) => node.jump(sensorData.t.toLong, new Callback[Node] {
            override def on(result: Node): Unit = {
              result.setProperty("value", Type.DOUBLE, sensorData.v.toDouble)
              returnObject.value.value = sensorData
            }
          })

          case None => ()
        }
      }).execute()
  }

  /**
    * Get sensor data
    *
    * @param name         Sensor name
    * @param date         Date
    * @param returnObject Return of the callback
    */
  def get(name: String, date: Long, returnObject: Return) = {
    _graph.newTask().fromIndexAll("nodes")
      .select(new TaskFunctionSelect {
        override def select(node: Node) = node.get("name").equals(name)
      })
      .`then`(new TaskAction {
        override def eval(context: TaskContext): Unit = context.getPreviousResult.asInstanceOf[Array[Node]].headOption match {
          case Some(node) => node.jump(date, new Callback[Node] {
            override def on(result: Node): Unit = {
              returnObject.value.value = SensorData(result.get("name").toString, result.get("value").toString, result.time().toString)
            }
          })

          case None => ()
        }
      }).execute()
  }

  Runtime.getRuntime.addShutdownHook(new Thread() {
    override def run() = _graph.save(new Callback[Boolean] {
      override def on(result: Boolean): Unit = { if (result) println("Graph saved") else println("An error occurred during the graph saving") }
    })
  })
}

