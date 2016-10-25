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

package fr.i3s.modalis.cosmic.importer

import fr.i3s.modalis.cosmic.collector.{SensorData, SensorDataJsonSupport}
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClientBuilder

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 24/10/2016.
  */
object RestImporter {

  val DEFAULT_TARGET = "http://127.0.0.1:11000/collect"

  def apply(sensorData: SensorData, target:String = DEFAULT_TARGET) = {
    val post = new HttpPost(target)
    post.setHeader("Content-type", "application/json")
    post.setEntity(new StringEntity(SensorDataJsonSupport.format.write(sensorData).toString()))
    val client = HttpClientBuilder.create().build()
    client.execute(post)
  }
}
