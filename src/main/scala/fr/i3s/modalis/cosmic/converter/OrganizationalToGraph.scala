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

import com.typesafe.scalalogging.LazyLogging
import fr.i3s.modalis.cosmic.nodes.ContainerNode.ContainerNodeFactory
import fr.i3s.modalis.cosmic.nodes.SensorNode.SensorNodeFactory
import fr.i3s.modalis.cosmic.organizational.sample.InfraSmartCampus
import fr.i3s.modalis.cosmic.organizational.{Catalog, Container, Sensor}
import org.mwg._
import org.mwg.core.NoopScheduler
import org.mwg.task.{TaskAction, TaskContext, TaskFunctionSelect}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 18/05/2016.
  */
object OrganizationalToGraph extends LazyLogging{

  def convertSensor(s: Sensor, parent: Node, graph: Graph): Unit = {
    graph.connect(new Callback[Boolean] {
      override def on(result: Boolean): Unit = {
        val sensorNode = graph.newTypedNode(0, 0, "SensorNode")
        sensorNode.setProperty("name", Type.STRING, s.name)
        sensorNode.setProperty("value", Type.DOUBLE, Double.NaN)
        sensorNode.setProperty("type", Type.STRING, s.observes.name)
        parent.add("sensor", sensorNode)
        graph.index("nodes", sensorNode, "name", null)
        logger.debug(s"Created sensor node ${sensorNode.get("name")}")
      }
    })

  }

  def convertContainer(container: Container, parent:Option[Node], catalog: Catalog, graph: Graph): Unit = {
    graph.connect(new Callback[Boolean] {
      override def on(result: Boolean): Unit = {
        val containerNode = graph.newTypedNode(0, 0, "ContainerNode")
        containerNode.setProperty("name", Type.STRING, container.name)

        if (parent.isDefined)
          parent.get.add("contains", containerNode)
        else // It is the root node
          graph.index("root", containerNode, "name", null)

        logger.debug(s"Created container node ${containerNode.get("name")}")

        // Adding the node to the graph indexes
        graph.index("nodes", containerNode, "name", null)


        // Loop on children containers and sensors if we are at parent level
        if (parent.isEmpty) {
          container.getSensors.foreach(s => convertSensor(s, containerNode, graph))
          container.getContainersName.filterNot(_ equals container.name).foreach(cName => {
            convertContainer(catalog.getContainer(cName).get, Some(containerNode), catalog, graph)
          })
        }


      }
    })

  }


  def apply(organizationalModel: Catalog, graph: Graph) = {
    logger.info("Building the graph from " + organizationalModel.name)
    convertContainer(organizationalModel.root, None, organizationalModel, graph)
    graph
  }
}

object RunConverter extends App {
  val graph = OrganizationalToGraph(InfraSmartCampus.catalog, GraphBuilder.builder().withScheduler(new NoopScheduler()).withFactory(new ContainerNodeFactory).withFactory(new SensorNodeFactory).build())
  graph.newTask().fromIndexAll("nodes")
    .select(new TaskFunctionSelect {
      override def select(node: Node) = node.get("name").equals("TEMP_CAMPUS")
    })
    .`then`(new TaskAction {
      override def eval(context: TaskContext): Unit = {
        println("Ive found " + context.getPreviousResult.asInstanceOf[Array[Node]].length + " results")
        println(context.getPreviousResult.asInstanceOf[Array[Node]].headOption.get.get("type"))
      }

    }).execute()
}

