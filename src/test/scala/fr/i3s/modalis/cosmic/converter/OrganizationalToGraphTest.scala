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

package fr.i3s.modalis.cosmic.converter

import java.lang.Boolean

import fr.i3s.modalis.cosmic.TheLabExample
import fr.i3s.modalis.cosmic.mwdb.nodes.ContainerNode.ContainerNodeFactory
import fr.i3s.modalis.cosmic.mwdb.nodes.ObservationNode.ObservationNodeFactory
import fr.i3s.modalis.cosmic.mwdb.nodes.SensorNode.SensorNodeFactory
import org.mwg.core.scheduler.NoopScheduler
import org.mwg.task.{Action, TaskContext, TaskFunctionSelect}
import org.mwg.{Callback, GraphBuilder, LevelDBStorage, Node}
import org.specs2.mutable.SpecificationWithJUnit

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 20/05/2016.
  */
class OrganizationalToGraphTest extends SpecificationWithJUnit {
  val theTestedGraph = GraphBuilder.
    builder().
    withScheduler(new NoopScheduler()).
    withStorage(new LevelDBStorage("data")).
    withFactory(new ContainerNodeFactory).
    withFactory(new SensorNodeFactory).
    withFactory(new ObservationNodeFactory).
    build()

  val testingCatalog = TheLabExample.catalog

  "A converter" should {
    "convert observations in observation node" in {
      var res = Array[Node]()
      OrganizationalToGraph.buildDataTypeVirtualNodes(testingCatalog.patterns, theTestedGraph)

      theTestedGraph.connect(new Callback[Boolean] {
        override def on(result: Boolean): Unit = theTestedGraph.newTask().fromIndexAll("types").select(
          new TaskFunctionSelect {
            override def select(node: Node) = true
          }
        ).`then`(new Action {
          override def eval(context: TaskContext): Unit = {
            res = context.getPreviousResult.asInstanceOf[Array[Node]]
          }
        }).execute()
      })

      res.length must beEqualTo(testingCatalog.patterns.size)
    }

  }
}
