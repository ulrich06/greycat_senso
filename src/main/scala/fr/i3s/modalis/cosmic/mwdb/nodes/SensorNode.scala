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

import java.lang.Boolean

import org.mwg._
import org.mwg.ml.algorithm.profiling.GaussianSlotNode
import org.mwg.ml.algorithm.regression.PolynomialNode
import org.mwg.plugin.{AbstractNode, NodeState}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 13/06/2016.
  */
abstract case class SensorNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long])
  extends AbstractNode(p_world: Long, p_time: Long, p_id: Long, p_graph: Graph, currentResolution: Array[Long]) {

  val min: Double = get("min").asInstanceOf[Double]
  val max: Double = get("max").asInstanceOf[Double]

  def getDataCompressionRatio = {
    var nbPointsCompressed: Int = 1
    rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
      override def on(a: Array[Node]): Unit = nbPointsCompressed = a(0).asInstanceOf[CompressedSensorNode].getNbPoints
    })

    if (getNbPoints != 0)
      nbPointsCompressed.toDouble / getNbPoints
    else 0.0
  }

  def getNbPoints = {
    var result: Int = 0
    this.timepoints(Constants.BEGINNING_OF_TIME, Constants.END_OF_TIME, new Callback[Array[Long]]() {
      def on(longs: Array[Long]) {
        result = longs.length
      }
    })
    println(s"Non compressed: $result")
    result
  }

  def getTimeline = {
    var result: Array[Long] = Array[Long]()
    this.timepoints(Constants.BEGINNING_OF_TIME, Constants.END_OF_TIME, new Callback[Array[Long]] {
      override def on(a: Array[Long]): Unit = {
        result = a.drop(1) //Drop the node origin (0)
      }
    })
    result
  }


  /**
    * Build the activity node related to the sensor
    *
    * @return Activity node
    */
  def buildActivityNode(): Node

  def buildCompressedNode() = {
    val state: NodeState = _resolver.resolveState(this, true)
    if (state.getFromKey(SensorNode.COMPRESSED_RELATIONSHIP) == null) {
      val compressedNode: Node = graph.newTypedNode(0, time, CompressedSensorNode.NAME)
      compressedNode.setProperty(PolynomialNode.PRECISION, Type.DOUBLE, get(SensorNode.PRECISION_KEY).asInstanceOf[Double])
      add(SensorNode.COMPRESSED_RELATIONSHIP, compressedNode)

    }
  }

  override def get(propertyName: String): AnyRef = {
    if ("value".equals(propertyName)) {
      if (super.get(propertyName).asInstanceOf[Double] >= max) {
        max.asInstanceOf[AnyRef]
      } else if (super.get(propertyName).asInstanceOf[Double] <= min) {
        min.asInstanceOf[AnyRef]
      } else super.get(propertyName)
    }
    else super.get(propertyName)
  }

  override def init(): Unit = {
    val meanValue: Node = graph.newTypedNode(0, time, GaussianSlotNode.NAME)
    meanValue.set(GaussianSlotNode.SLOTS_NUMBER, SensorNode.SLOTS)
    meanValue.set(GaussianSlotNode.PERIOD_SIZE, SensorNode.PERIOD)
    add(SensorNode.STATS_RELATIONSHIP, meanValue)


    super.init()
  }

  override def setProperty(propertyName: String, propertyType: Byte, propertyValue: Any) {
    val state: NodeState = _resolver.resolveState(this, true)

    if ("value".equals(propertyName) && state.time() > 0L) {

      rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
        override def on(a: Array[Node]): Unit = {
          println(s"Learn: ${propertyValue.asInstanceOf[Double]}")
          val _node = a(0).asInstanceOf[CompressedSensorNode]
          _node.learn(propertyValue.asInstanceOf[Double], new Callback[Boolean] {
            override def on(a: Boolean): Unit = {}
          })
          _node.extrapolate(new Callback[java.lang.Double] {
            override def on(a: java.lang.Double): Unit = println(s"Learnt $a ${_node.toString} - Precision: ${get(SensorNode.PRECISION_KEY)}")
          })
        }
      })

      rel(SensorNode.STATS_RELATIONSHIP, new Callback[Array[Node]]() {
        def on(result: Array[Node]) {
          val profiler: GaussianSlotNode = result(0).asInstanceOf[GaussianSlotNode]
          profiler.learnArray(Array[Double](propertyValue.asInstanceOf[Double]))
        }
      })

    }

    super.setProperty(propertyName, propertyType, propertyValue)
  }
}


object SensorNode {

  val ACTIVITY_RELATIONSHIP = "ACTIVITY"
  val STATS_RELATIONSHIP = "STATS"
  val COMPRESSED_RELATIONSHIP = "COMPRESSED"

  val PRECISION_KEY = "precision"
  val SLOTS: Int = 24
  val PERIOD: Long = 24 * 3600

  val NAME: String = "SensorNode"


}