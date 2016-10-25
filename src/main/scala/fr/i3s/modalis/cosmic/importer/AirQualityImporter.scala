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

import java.text.SimpleDateFormat

import fr.i3s.modalis.cosmic.collector.SensorData
import org.mwg.Graph
import org.mwg.csv.CSVImporter

import scala.io.Source


/**
  * Created by Cyril Cecchinel - I3S Laboratory on 24/10/2016.
  */
object AirQualityImporter {

  def apply(path:String) = {
    val dateFormat = new SimpleDateFormat("d/MM/yyyy HH.mm.ss")
    val bufferedSource = Source.fromFile(path)
    for (line <- bufferedSource.getLines()){
      val cols = line.split(";").map(_.trim)
      if (cols.length > 0){
        val date = dateFormat.parse(cols(0) + " " + cols(1)).getTime / 1000
        val value_nox = cols(7)
        val value_o3 = cols(11)
        val value_temp = cols(12)
        RestImporter(SensorData("NOX", value_nox, date.toString))
       // RestSender(SensorData("O3", value_o3, date.toString))
        //RestSender(SensorData("TEMP_DATASET", value_temp, date.toString))
      }
    }

  }
}

object Demo extends App {
  AirQualityImporter("/Users/cyrilcecchinel/Downloads/AirQualityUCI/AirQualityUCI.csv")
}
