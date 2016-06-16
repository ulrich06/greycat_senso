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

package fr.i3s.modalis.cosmic.mwdb.nodes

import org.mwg.ml.algorithm.profiling.GaussianSlotProfilingNode
import org.mwg.plugin.NodeFactory
import org.mwg.{Callback, Graph, Node}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 14/06/2016.
  */
class PeriodicSensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long])
  extends SensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long]) {


  override def get(propertyName: String): AnyRef = {
    val state = _resolver.resolveState(this, true)

    if ("value".equals(propertyName)) {
      if (state.getFromKey(SensorNode.ACTIVITY_RELATIONSHIP) == null) {
        add(SensorNode.ACTIVITY_RELATIONSHIP, buildActivityNode())
      }

      rel(SensorNode.ACTIVITY_RELATIONSHIP, new Callback[Array[Node]] {
        override def on(a: Array[Node]): Unit = {
          val _node = a(0).asInstanceOf[GaussianSlotProfilingNode]
          _node.learnArray(Array(1.0))
        }
      })
    }

    super.get(propertyName)
  }

  /**
    * Build the activity node related to the sensor
    *
    * @return Activity node
    */
  override def buildActivityNode(): Node = {
    val node = graph().newTypedNode(0, time, GaussianSlotProfilingNode.NAME)
    node.set(GaussianSlotProfilingNode.PERIOD_SIZE, SensorNode.PERIOD)
    node.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SensorNode.SLOTS)
    node.set("On", "USAGES")
    node
  }
}

object PeriodicSensorNode {
  val NAME: String = "PeriodicSensorNode"

  sealed class PeriodicSensorNodeFactory extends NodeFactory {
    def name: String = NAME

    def create(world: Long, time: Long, id: Long, graph: Graph, initialResolution: Array[Long]): Node = {
      new PeriodicSensorNode(world, time, id, graph, initialResolution)
    }
  }

}



