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

import fr.i3s.modalis.cosmic.organizational._
import fr.i3s.modalis.cosmic.organizational.shared.{DoubleType, IntegerType}

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 15/12/2015.
  */
object DemoSNT {
  val timefield = AtomicField("time", Continuous(Some(IntegerType(0)), None))

  val temperature_indoor = Observation("TEMPERATURE_INDOOR", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(0.0)), Some(DoubleType(50.0))))), Some(2.0))
  val vcc = Observation("VCC", timefield, Set(AtomicField("v", Continuous(Some(DoubleType(0.0)), Some(DoubleType(5000.0))))), Some(5.0))

  val infrastructure = Container("SnT", EContainerType.Campus, Set(
    Periodic("TEMP_REAL", 60, "", temperature_indoor),
    Periodic("VCC_REAL", 60, "", vcc),
    Periodic("TEMP_XP", 0, "", temperature_indoor),
    Periodic("VCC_XP", 0, "", vcc)))


  val catalog = Catalog("SnT", infrastructure, Set(temperature_indoor, vcc))
}
