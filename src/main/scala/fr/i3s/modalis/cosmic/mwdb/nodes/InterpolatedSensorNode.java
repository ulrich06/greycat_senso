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

package fr.i3s.modalis.cosmic.mwdb.nodes;

import org.mwg.Graph;
import org.mwg.Node;
import org.mwg.Type;
import org.mwg.ml.algorithm.regression.PolynomialNode;
import org.mwg.plugin.NodeFactory;

/**
 * SmartCampus node
 * Created by Cyril Cecchinel - I3S Laboratory on 17/05/2016.
 */
public class InterpolatedSensorNode extends PolynomialNode{
    final static double PRECISION = 1.0;
    private static final String NAME = "InterpolatedSensorNode";

    private InterpolatedSensorNode(long p_world, long p_time, long p_id, Graph p_graph, long[] currentResolution) {
        super(p_world, p_time, p_id, p_graph, currentResolution);
    }


    @Override
    public void init(){
        setProperty(PolynomialNode.PRECISION_KEY, Type.DOUBLE, PRECISION);
    }

    public static class InterpolatedSensorNodeFactory implements NodeFactory {
        @Override
        public String name() {
            return NAME;
        }

        @Override
        public Node create(long world, long time, long id, Graph graph, long[] initialResolution) {
            return new InterpolatedSensorNode(world, time, id, graph, initialResolution);
        }
    }
}
