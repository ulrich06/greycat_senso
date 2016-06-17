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
import fr.i3s.modalis.cosmic.mwdb.nodes.{EventSensorNode, PeriodicSensorNode}
import fr.i3s.modalis.cosmic.organizational._
import org.mwg._
import org.mwg.task.{Action, TaskContext}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 18/05/2016.
  */
object OrganizationalToGraph extends LazyLogging {

  def convertSensor(s: Sensor, parent: Node, graph: Graph): Unit = {
    var sensorNode: Node = null
    graph.connect(new Callback[Boolean] {
      override def on(a: Boolean): Unit = {
        graph.newTask().fromIndex("sensors", s"name = ${s.name}")
          .`then`(new Action {
            override def eval(taskContext: TaskContext): Unit =
              if (taskContext.result().asInstanceOf[Array[Node]].isEmpty) {
                logger.debug(s"Creating sensor node ${s.name}")
                if (s.isInstanceOf[Periodic]) {
                  sensorNode = graph.newTypedNode(0, 0, PeriodicSensorNode.NAME)
                  sensorNode.setProperty("collect", Type.STRING, "Periodic")
                }
                if (s.isInstanceOf[EventBased]) {
                  sensorNode = graph.newTypedNode(0, 0, EventSensorNode.NAME)
                  sensorNode.setProperty("collect", Type.STRING, "Event")
                }


                sensorNode.setProperty("name", Type.STRING, s.name)
                sensorNode.setProperty("value", Type.DOUBLE, Double.NaN)
                sensorNode.setProperty("type", Type.STRING, s.observes.name)


                parent.add("sensor", sensorNode)
                graph.index("nodes", sensorNode, "name", null)
                graph.index("sensors", sensorNode, "name", null)
                logger.debug(s"Created sensor node ${sensorNode.get("name")}")

              }
          }).execute()

        graph.newTask().fromIndex("types", s"name = ${s.observes.name}")
          .`then`(new Action {
            override def eval(context: TaskContext): Unit = {
              context.result().asInstanceOf[Array[Node]](0).add("sensors", sensorNode)
            }
          }).execute()
      }
    })


  }

  def convertContainer(container: Container, parent: Option[Node], catalog: Catalog, graph: Graph): Unit = {
    graph.connect(new Callback[Boolean] {
      override def on(result: Boolean): Unit = {
        graph.newTask().fromIndex("containers", s"name = ${container.name}").`then`(
          new Action {
            override def eval(taskContext: TaskContext): Unit = if (taskContext.result().asInstanceOf[Array[Node]].isEmpty) {
              logger.debug(s"Creating container ${container.name}")
              val containerNode = graph.newTypedNode(0, 0, "ContainerNode")
              containerNode.setProperty("name", Type.STRING, container.name)

              if (parent.isDefined)
                parent.get.add("contains", containerNode)
              else // It is the root node
                graph.index("root", containerNode, "name", null)

              logger.debug(s"Created container node ${containerNode.get("name")} (parent: ${if (parent.isDefined) parent.get.get("name")})")

              // Adding the node to the graph indexes
              graph.index("nodes", containerNode, "name", null)
              graph.index("containers", containerNode, "name", null)
              container.getSensors.foreach(s => {
                convertSensor(s, containerNode, graph)
                var sensorNode: Node = null
                logger.debug(s"Looking for node ${s.name}")
                graph.newTask().fromIndex("sensors", s"name=${s.name}").`then`(new Action {
                  override def eval(context: TaskContext): Unit = {
                    sensorNode = context.result().asInstanceOf[Array[Node]](0)
                  }
                }).execute()
                containerNode.add("sensors", sensorNode)
              })
              val listOfInnerContainers = container.getContainersName.filterNot(_ equals container.name)
              val listOfInnerContainersFirstLevel = listOfInnerContainers.intersect(container.contains.collect({ case y => y }).map {
                _.name
              })
              listOfInnerContainersFirstLevel.foreach(cName => {
                convertContainer(catalog.getContainer(cName).get, Some(containerNode), catalog, graph)
              })
            }
          }
        ).execute()
      }
    })

  }


  def buildDataTypeVirtualNodes(patterns: Set[Observation], graph: Graph) = {
    graph.connect(new Callback[Boolean] {
      override def on(a: Boolean): Unit = {
        patterns.foreach(observation => {
          graph.newTask().fromIndex("types", s"name = ${observation.name}")
            .`then`(new Action {
              override def eval(taskContext: TaskContext): Unit = if (taskContext.result().asInstanceOf[Array[Node]].isEmpty) {
                val node = graph.newTypedNode(0, 0, "ObservationNode")
                node.setProperty("name", Type.STRING, observation.name)
                logger.debug(s"Created observation node ${node.get("name")}")

                graph.index("nodes", node, "name", null)
                graph.index("types", node, "name", null)
              }
            }).execute()
        })
      }
    })
  }


  def apply(organizationalModel: Catalog, graph: Graph) = {
    logger.info("Building the graph from " + organizationalModel.name)
    buildDataTypeVirtualNodes(organizationalModel.patterns, graph)
    convertContainer(organizationalModel.root, None, organizationalModel, graph)
    graph
  }
}