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

import org.mwg.ml.algorithm.profiling.GaussianSlotNode
import org.mwg.plugin.NodeState
import org.mwg.{Callback, Graph, Node}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 15/06/2016.
  */
class EventSensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long])
  extends SensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long]) {

  override def setProperty(propertyName: String, propertyType: Byte, propertyValue: Any): Unit = {
    val state: NodeState = _resolver.resolveState(this, true)

    if ("value".equals(propertyName)) {
      if (state.getFromKey(SensorNode.ACTIVITY_RELATIONSHIP) == null) {
        add(SensorNode.ACTIVITY_RELATIONSHIP, buildActivityNode())
      }

      rel(SensorNode.ACTIVITY_RELATIONSHIP, new Callback[Array[Node]] {
        override def on(a: Array[Node]): Unit = {
          val _node = a(0).asInstanceOf[GaussianSlotNode]
          _node.learnArray(Array(1.0))
        }
      })
    }


    super.setProperty(propertyName, propertyType, propertyValue)
  }

  /**
    * Build the activity node related to the sensor
    *
    * @return Activity node
    */
  override def buildActivityNode(): Node = {
    val node = graph().newTypedNode(0, time, GaussianSlotNode.NAME)
    node.set(GaussianSlotNode.PERIOD_SIZE, SensorNode.PERIOD)
    node.set(GaussianSlotNode.SLOTS_NUMBER, SensorNode.SLOTS)
    node.set("On", "UPDATES")
    node
  }
}


object EventSensorNode {
  val NAME: String = "EventSensorNode"

}