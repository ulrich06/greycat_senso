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

package fr.i3s.modalis.cosmic.mwdb.returns

import fr.i3s.modalis.cosmic.collector.SensorData
import play.api.libs.json.{JsObject, JsValue}

/**
  * Handle the return of callbacks
  */
trait Return {
  val value: Field[_]
  var _ready: Boolean = false

  def isReady = _ready

  def setState(b: Boolean) = _ready = b
}

class SensorDataReturn extends Return {
  val value = new Field(SensorData("", "", ""))
}

class JSONReturn extends Return {
  val value = new Field(new JsObject(Map[String, JsValue]()))
}

class DoubleArrayReturn extends Return {
  val value = new Field({
    0.0
  }.asInstanceOf[Array[Double]])
}

class ArraySensorDataReturn extends Return {
  val value = new Field(Array[SensorData]())
}

class DoubleReturn extends Return {
  val value = new Field(0.0)
}

class ArrayLongReturn extends Return {
  val value = new Field(Array[Long]())
}

class ArrayIntReturn extends Return {
  val value = new Field(Array[Int]())
}

class ArrayStringReturn extends Return {
  val value = new Field(Array[String]())
}