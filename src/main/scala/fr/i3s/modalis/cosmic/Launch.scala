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

package fr.i3s.modalis.cosmic

import akka.actor.{ActorSystem, Props}
import akka.io.IO
import akka.pattern.ask
import akka.util.Timeout
import com.typesafe.config.ConfigFactory
import fr.i3s.modalis.cosmic.collector.MWDBCollectorActor
import fr.i3s.modalis.cosmic.converter.OrganizationalToGraph
import fr.i3s.modalis.cosmic.mwdb.DataStorage
import fr.i3s.modalis.cosmic.mwdb.nodes.ContainerNode.ContainerNodeFactory
import fr.i3s.modalis.cosmic.mwdb.nodes.ObservationNode.ObservationNodeFactory
import fr.i3s.modalis.cosmic.mwdb.nodes.SensorNode.SensorNodeFactory
import org.mwg.core.scheduler.NoopScheduler
import org.mwg.ml.algorithm.profiling.GaussianSlotProfilingNode
import org.mwg.{GraphBuilder, LevelDBStorage}
import spray.can.Http

import scala.concurrent.duration._
/**
  * Init the DB and the HTTP service
  *
  * @author ${user.name}
  */
object Launch extends App {
  val conf = ConfigFactory.load()
  val serverPort = conf.getInt("port")
  implicit val system = ActorSystem("on-spray-can")

  val service = system.actorOf(Props[MWDBCollectorActor], "collector-service")
  implicit val timeout = Timeout(5.seconds)


  DataStorage.init(OrganizationalToGraph(TheLabExample.catalog,
    GraphBuilder.
      builder().
      withScheduler(new NoopScheduler()).
      withFactory(new ContainerNodeFactory).
      withFactory(new SensorNodeFactory).
      withFactory(new ObservationNodeFactory).
      withFactory(new GaussianSlotProfilingNode.Factory()).
      withStorage(new LevelDBStorage("smartcampus")).
      build()))

  IO(Http) ? Http.Bind(service, interface = "localhost", port = serverPort)


}
