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

package fr.i3s.modalis.cosmic.infrastructures

import fr.i3s.modalis.cosmic.organizational._
import fr.i3s.modalis.cosmic.organizational.shared.{DoubleType, IntegerType}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 25/10/2016.
  */
object DemoAirQualityInfra {

  val timefield = AtomicField("time", Continuous(Some(IntegerType(0)), None))

  val co_observation = Observation("CO", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(0.1)), Some(DoubleType(100))))), Some(0.1))
  val nox_observation = Observation("NOX", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(20)), Some(DoubleType(1000))))), Some(0.1))
  val o3_observation = Observation("O3", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(20)), Some(DoubleType(6000))))), Some(0.1))
  val no2_observation = Observation("NO2", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(0)), Some(DoubleType(2))))), Some(0.1))

  val infrastructure = Container("SensorBox", EContainerType.OpenSpace, Set(
    Periodic("CO_SENSOR", 300, "", co_observation),
    Periodic("NOX_SENSOR", 300, "", nox_observation),
    Periodic("O3_SENSOR", 300, "", o3_observation),
    Periodic("NO2_SENSOR", 300, "", no2_observation)
  ))

  val catalog = Catalog("SensorBox", infrastructure, Set(co_observation, nox_observation, o3_observation, no2_observation))
}
