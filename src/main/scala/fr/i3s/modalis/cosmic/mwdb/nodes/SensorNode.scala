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
import org.mwg.plugin.{AbstractNode, NodeFactory, NodeState}
import org.mwg.{Callback, Graph, Node}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 13/06/2016.
  */
case class SensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long])
  extends AbstractNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long]) {


  override def get(propertyName: String): Object = {
    val state: NodeState = _resolver.resolveState(this, true)
    if ("value" == propertyName && state.time > 0L) {
      if (state.getFromKey(SensorNode.USE_RELATIONSHIP) == null) {
        val profileUsage: Node = graph.newTypedNode(0, time, GaussianSlotProfilingNode.NAME)
        profileUsage.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SensorNode.SLOTS)
        profileUsage.set(GaussianSlotProfilingNode.PERIOD_SIZE, SensorNode.PERIOD)
        add(SensorNode.USE_RELATIONSHIP, profileUsage)
      }
      rel(SensorNode.USE_RELATIONSHIP, new Callback[Array[Node]]() {
        def on(result: Array[Node]) {
          System.out.println("Learning GET at " + time)
          val profiler: GaussianSlotProfilingNode = result(0).asInstanceOf[GaussianSlotProfilingNode]
          System.out.println("Learning GET profiler at " + profiler.time)
          profiler.learnArray(Array[Double](1.0))
          for (v <- profiler.getSum) {
            print(v + " ")
          }
          println()
        }
      })
    }
    super.get(propertyName)
  }

  override def setProperty(propertyName: String, propertyType: Byte, propertyValue: Any) {
    val state: NodeState = _resolver.resolveState(this, true)
    if ("value" == propertyName && state.time > 0L) {
      if (state.getFromKey(SensorNode.UPDATE_RELATIONSHIP) == null) {
        val profileValue: Node = graph.newTypedNode(0, time, GaussianSlotProfilingNode.NAME)
        profileValue.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SensorNode.SLOTS)
        profileValue.set(GaussianSlotProfilingNode.PERIOD_SIZE, SensorNode.PERIOD)
        add(SensorNode.UPDATE_RELATIONSHIP, profileValue)
      }
      if (state.getFromKey(SensorNode.USE_RELATIONSHIP) == null) {
        val meanValue: Node = graph.newTypedNode(0, time, GaussianSlotProfilingNode.NAME)
        meanValue.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SensorNode.SLOTS)
        meanValue.set(GaussianSlotProfilingNode.PERIOD_SIZE, SensorNode.PERIOD)
        add(SensorNode.USE_RELATIONSHIP, meanValue)
      }
      rel(SensorNode.UPDATE_RELATIONSHIP, new Callback[Array[Node]]() {
        def on(result: Array[Node]) {
          System.out.println("Learning SET at " + time)
          val profiler: GaussianSlotProfilingNode = result(0).asInstanceOf[GaussianSlotProfilingNode]
          System.out.println("Learning SET profiler at " + profiler.time)
          profiler.learnArray(Array[Double](1.0))
          for (v <- profiler.getSum) {
            print(v + " ")
          }
          println()
        }
      })
      rel(SensorNode.USE_RELATIONSHIP, new Callback[Array[Node]]() {
        def on(result: Array[Node]) {
          System.out.println("Learning SET at " + time)
          val profiler: GaussianSlotProfilingNode = result(0).asInstanceOf[GaussianSlotProfilingNode]
          System.out.println("Learning SET profiler at " + profiler.time)
          profiler.learnArray(Array[Double](propertyValue.asInstanceOf[Double]))
          for (v <- profiler.getSum) {
            print(v + " ")
          }
          println()
        }
      })
    }
    super.setProperty(propertyName, propertyType, propertyValue)
  }


}

object SensorNode {
  val USE_RELATIONSHIP = "USE"
  val UPDATE_RELATIONSHIP = "UPDATE"
  val SLOTS: Int = 24
  val PERIOD: Long = 24 * 3600
  val NAME: String = "SensorNode"

  sealed class SensorNodeFactory extends NodeFactory {
    def name: String = "SensorNode"

    def create(world: Long, time: Long, id: Long, graph: Graph, initialResolution: Array[Long]): Node = {
      new SensorNode(world, time, id, graph, initialResolution)
    }
  }

}

