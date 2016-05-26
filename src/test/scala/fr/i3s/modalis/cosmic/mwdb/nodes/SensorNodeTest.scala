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
import org.mwg.core.scheduler.NoopScheduler
import org.mwg.ml.algorithm.profiling.GaussianSlotProfilingNode
import org.mwg.task.{TaskAction, TaskContext}
import org.specs2.mutable.SpecificationWithJUnit

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 25/05/2016.
  */
class SensorNodeTest extends SpecificationWithJUnit{

  val graph = GraphBuilder.
    builder().
    withScheduler(new NoopScheduler()).
    withFactory(new GaussianSlotProfilingNode.Factory()).
    build()

  graph.connect(new Callback[Boolean] {
    override def on(result: Boolean): Unit = {
      val index = graph.newNode(0, 0)
      index.setProperty("name", Type.STRING, "root")

      val profileUsage = graph.newTypedNode(0, 0, GaussianSlotProfilingNode.NAME)
      profileUsage.setProperty("name", Type.STRING, "profile")
      profileUsage.set(GaussianSlotProfilingNode.SLOTS_NUMBER, 12)

      index.add("profileUsage", profileUsage)
      graph.index("nodes", index, "name", null)
      graph.index("nodes", profileUsage, "name", null)
      graph.index("root", index, "name", null)


    }
  })

  "A usage profile node" should {
    "learn values" in {
      var resultTest = false
      var sum:Array[Double] = Array(0.0)
      graph.connect(new Callback[Boolean] {
        override def on(result: Boolean): Unit = graph.newTask().time(System.currentTimeMillis()).fromIndex("nodes", "name=index").then(new TaskAction {
          override def eval(context: TaskContext): Unit = {
            val result = context.getPreviousResult.asInstanceOf[Array[Node]](0).rel("profileUsage", new Callback[Array[Node]] {
              override def on(result: Array[Node]): Unit = {
                val profileNode = result(0).asInstanceOf[GaussianSlotProfilingNode]
                profileNode.learnArray(Array(1.0))
                sum = profileNode.getSum
                resultTest =  profileNode.getSum sameElements Array(1.0)
              }
            })

          }
        })
      })
      resultTest must beTrue
    }
  }

}
