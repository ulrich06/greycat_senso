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

package fr.i3s.modalis.cosmic.mwdb

import java.lang.{Boolean, Double}

import com.typesafe.scalalogging.LazyLogging
import fr.i3s.modalis.cosmic.collector.SensorData
import fr.i3s.modalis.cosmic.mwdb.nodes.{CompressedSensorNode, EventSensorNode, PeriodicSensorNode, SensorNode}
import fr.i3s.modalis.cosmic.mwdb.returns._
import org.kevoree.modeling.addons.rest.RestGateway
import org.mwg._
import org.mwg.ml.algorithm.profiling.GaussianSlotProfilingNode
import org.mwg.task._

  /**
    * Created by Cyril Cecchinel - I3S Laboratory on 06/05/2016.
    */

  /**
    * Sensor data storage
    */
  object DataStorage {


    private lazy val gateway: RestGateway = RestGateway.expose(_graph, _httpPort)
    // MWDB REST
    val _httpPort = 8050
    // The graph
    private var _graph: Graph = _
    private var isInitialized = false

    /**
      * Initialize the data storage by creating a root node and indexes
      */
    def init(graph: Graph) = {
      _graph = graph
      isInitialized = true
      gateway.start()
    }

    def getGraph = if (isInitialized) _graph else throw new RuntimeException("Data storage not yet initialized")

    def getActivity(sensor: String, returnObject: ArrayIntReturn) = {
      _graph.newTask().fromIndex("nodes", s"name = $sensor").`then`(new Action {
        override def eval(taskContext: TaskContext): Unit = taskContext.result().asInstanceOf[Array[Node]].headOption match {
          case Some(node) =>
            var res = Array.fill(SensorNode.SLOTS + 1)(0)
            node match {
              case x: EventSensorNode => x.rel(SensorNode.ACTIVITY_RELATIONSHIP, new Callback[Array[Node]] {
                override def on(a: Array[Node]): Unit = if (!a.isEmpty) {
                  val gaussianNode = a(0).asInstanceOf[GaussianSlotProfilingNode]
                  res = gaussianNode.getTotal
                }
              })
              case x: PeriodicSensorNode => x.timepoints(Constants.BEGINNING_OF_TIME, Constants.END_OF_TIME, new Callback[Array[Long]] {
                override def on(a: Array[Long]): Unit = {
                  a.foreach(value => {
                    node.jump(value, new Callback[Node] {
                      override def on(a: Node): Unit = a.rel(SensorNode.ACTIVITY_RELATIONSHIP, new Callback[Array[Node]] {
                        override def on(r: Array[Node]): Unit = {
                          if (!r.isEmpty) {
                            val gaussianNode = r(0).asInstanceOf[GaussianSlotProfilingNode]
                            res = (gaussianNode.getTotal, res).zipped.map(_ + _)
                          }
                        }
                      })
                    })
                  })
                }
              })
            }
            returnObject.value.value = res
          case None => ()
        }
      }).execute()
    }

    def getInflexions(sensor: String, returnObject: ArrayLongReturn) = {
      _graph.newTask().setTime(System.currentTimeMillis() / 1000).fromIndex("nodes", s"name = $sensor").`then`(new Action {
        override def eval(taskContext: TaskContext): Unit = taskContext.result().asInstanceOf[Array[Node]].headOption match {
          case Some(node) => node.rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
            override def on(a: Array[Node]): Unit = {
              returnObject.value.value = a(0).asInstanceOf[CompressedSensorNode].getInflexions
            }
          })
          case None => ()
        }
      }).execute()
    }

    def getInflexions(sensor: String, timestampB: Long, timestampE: Long, returnObject: ArrayLongReturn) = {
      _graph.newTask().setTime(System.currentTimeMillis() / 1000).fromIndex("nodes", s"name = $sensor").`then`(new Action {
        override def eval(taskContext: TaskContext): Unit = taskContext.result().asInstanceOf[Array[Node]].headOption match {
          case Some(node) => node.rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
            override def on(a: Array[Node]): Unit = {
              returnObject.value.value = a(0).asInstanceOf[CompressedSensorNode].getInflexions(timestampB, timestampE)
            }
          })
          case None => ()
        }
      }).execute()
    }


    def getCompressionRate(sensor: String, returnObject: DoubleReturn) = {
      _graph.newTask().setTime(System.currentTimeMillis() / 1000).fromIndex("nodes", s"name = $sensor").`then`(new Action {
        override def eval(taskContext: TaskContext): Unit = taskContext.result().asInstanceOf[Array[Node]].headOption match {
          case Some(node) => returnObject.value.value = node.asInstanceOf[SensorNode].getDataCompressionRatio
          case None => ()
        }
      }).execute()
    }

    /**
      * Update a sensor value
      *
      * @param sensorData   SensorData object
      * @param returnObject Return of the callback
      */
    def update(sensorData: SensorData, returnObject: SensorDataReturn) = {

      _graph.newTask().fromIndexAll("nodes")
        .select(new TaskFunctionSelect {
          override def select(node: Node) = node.get("name").equals(sensorData.n)
        })
        .`then`(new Action {
          override def eval(context: TaskContext): Unit = context.result().asInstanceOf[Array[Node]].headOption match {
            case Some(node) => node.jump(sensorData.t.toLong, new Callback[Node] {
              override def on(result: Node): Unit = {
                result.setProperty("value", Type.DOUBLE, sensorData.v.toDouble)
                result.free()
                returnObject.value.value = sensorData
              }
            })

            case None => ()
          }
        }).execute()

    }

    def get(name: String, dateBegin: Long, dateEnd: Long, returnObject: ArraySensorDataReturn): Unit = {
      _graph.newTask().fromIndexAll("nodes").select(new TaskFunctionSelect {
        override def select(node: Node) = node.get("name").equals(name)
      })
        .`then`(new Action {
          override def eval(context: TaskContext): Unit = context.result().asInstanceOf[Array[Node]].headOption match {
            case Some(node) => node.timepoints(dateBegin, dateEnd, new Callback[Array[Long]] {
              override def on(result: Array[Long]): Unit = {
                val mapResult = result.map { n =>
                  val returnSensorDataObject = new SensorDataReturn
                  get(name, n, returnSensorDataObject)
                  returnSensorDataObject.value.value

                }
                returnObject.value.value = mapResult
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
    def get(name: String, date: Long, returnObject: SensorDataReturn): Unit = {
      _graph.newTask().setTime(date).fromIndexAll("nodes")
        .select(new TaskFunctionSelect {
          override def select(node: Node) = node.get("name").equals(name)
        })
        .`then`(new Action {
          override def eval(context: TaskContext): Unit = context.result().asInstanceOf[Array[Node]].headOption match {
            case Some(node) => node.jump(date, new Callback[Node] {
              override def on(result: Node): Unit = {
                returnObject.value.value = SensorData(result.get("name").toString, result.get("value").toString, result.time().toString)
              }
            })

            case None => ()
          }
        }).execute()
    }

    def getInterpolated(name: String, date: Long, returnObject: SensorDataReturn) = {
      _graph.newTask().setTime(date).fromIndexAll("nodes")
        .select(new TaskFunctionSelect {
          override def select(node: Node) = node.get("name").equals(name)
        })
        .`then`(new Action {
          override def eval(context: TaskContext): Unit = context.result().asInstanceOf[Array[Node]].headOption match {
            case Some(node) => node.jump(date, new Callback[Node] {
              override def on(result: Node): Unit = {
                result.rel(SensorNode.COMPRESSED_RELATIONSHIP, new Callback[Array[Node]] {
                  override def on(a: Array[Node]): Unit = a(0).asInstanceOf[CompressedSensorNode].extrapolate(new Callback[Double] {
                    override def on(a: Double): Unit = {
                      returnObject.value.value = SensorData(result.get("name").toString, a.toString, result.time().toString)
                    }
                  })
                })

              }
            })

            case None => ()
          }
        }).execute()
    }

    Runtime.getRuntime.addShutdownHook(new Thread() with LazyLogging {
      override def run() = {
        gateway.stop()
        _graph.save(new Callback[Boolean] {
          override def on(result: Boolean): Unit = {
            if (result) logger.info("Graph saved") else logger.error("An error occurred during the graph saving")
          }
        })
      }
    })
  }

