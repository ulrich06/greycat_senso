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

package fr.i3s.modalis.cosmic.analyze

import org.joda.time.DateTime
import org.mwg.Graph

/**
  * Created by Cyril Cecchinel - I3S Laboratory on 02/08/2016.
  */
trait Analyzer {

  def apply(sensor: String, graph: Graph): List[Int]


}

object Analyzer {
  def getAdaptivePeriod(table: List[Int]) = {
    val now = new DateTime(System.currentTimeMillis)
    if (now.getMinuteOfHour * 60 + now.getSecondOfMinute + table(now.getHourOfDay) < 3600)
      table(now.getHourOfDay)
    else
      3600 - (now.getMinuteOfHour * 60 + now.getSecondOfMinute)
  }
}