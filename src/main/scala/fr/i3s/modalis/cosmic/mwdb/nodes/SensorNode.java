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

import org.mwg.Callback;
import org.mwg.Graph;
import org.mwg.Node;
import org.mwg.ml.algorithm.profiling.GaussianSlotProfilingNode;
import org.mwg.plugin.AbstractNode;
import org.mwg.plugin.NodeFactory;
import org.mwg.plugin.NodeState;

/**
 * SmartCampus node
 * Created by Cyril Cecchinel - I3S Laboratory on 17/05/2016.
 */
public class SensorNode extends AbstractNode{
    final static int SLOTS = 24;
    final static long PERIOD = 24*3600;
    private static final String NAME = "SensorNode";

    public static final String USAGE_NAME = "profileUsage";
    public static final String UPDATE_NAME = "profileValue";
    public static final String STATS_NAME = "StatsValue";


    private int calls = 0;

    private SensorNode(long p_world, long p_time, long p_id, Graph p_graph, long[] currentResolution) {
        super(p_world, p_time, p_id, p_graph, currentResolution);
    }

    @Override
    public Object get(String propertyName) {
        final NodeState state = _resolver.resolveState(this, true);
        if ("value".equals(propertyName) && state.time() > 0L){
            if (state.getFromKey(USAGE_NAME) == null){
                // create if not exist
                Node profileUsage = graph().newTypedNode(0, time(), GaussianSlotProfilingNode.NAME);
                profileUsage.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SLOTS);
                profileUsage.set(GaussianSlotProfilingNode.PERIOD_SIZE,PERIOD);
                add(USAGE_NAME, profileUsage);
            }
            rel(USAGE_NAME, new Callback<Node[]>() {
                @Override
                public void on(Node[] result) {
                    System.out.println("Learning GET at " + time());
                    GaussianSlotProfilingNode profiler = (GaussianSlotProfilingNode) result[0];
                    System.out.println("Learning GET profiler at "+ profiler.time());
                    profiler.learnArray(new double[]{1.0});
                    for (double v : profiler.getSum()) {
                        System.out.print(v + " ");
                    }
                    System.out.println();
                }
            });

        }
        return super.get(propertyName);
    }

    @Override
    public void setProperty(String propertyName, byte propertyType, final Object propertyValue){
    final NodeState state = _resolver.resolveState(this, true);
        if ("value".equals(propertyName) && state.time() > 0L) {
            if (state.getFromKey(UPDATE_NAME) == null){
                // create if not exist
                Node profileValue = graph().newTypedNode(0, time(), GaussianSlotProfilingNode.NAME);
                profileValue.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SLOTS);
                profileValue.set(GaussianSlotProfilingNode.PERIOD_SIZE,PERIOD);
                add(UPDATE_NAME, profileValue);
            }
            if (state.getFromKey(STATS_NAME) == null){
                Node meanValue = graph().newTypedNode(0, time(), GaussianSlotProfilingNode.NAME);
                meanValue.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SLOTS);
                meanValue.set(GaussianSlotProfilingNode.PERIOD_SIZE,PERIOD);
                add(STATS_NAME, meanValue);
            }
            rel(UPDATE_NAME, new Callback<Node[]>() {
                @Override
                public void on(Node[] result) {
                    System.out.println("Learning SET at "+ time());
                    GaussianSlotProfilingNode profiler = (GaussianSlotProfilingNode) result[0];
                    System.out.println("Learning SET profiler at "+ profiler.time());
                    profiler.learnArray(new double[]{1.0});
                    for (double v : profiler.getSum()) {
                        System.out.print(v + " ");
                    }
                    System.out.println();
                }
            });
            rel(STATS_NAME, new Callback<Node[]>() {
                @Override
                public void on(Node[] result) {
                    System.out.println("Learning SET at "+ time());
                    GaussianSlotProfilingNode profiler = (GaussianSlotProfilingNode) result[0];
                    System.out.println("Learning SET profiler at "+ profiler.time());
                    profiler.learnArray(new double[]{(Double) propertyValue});
                    for (double v : profiler.getSum()) {
                        System.out.print(v + " ");
                    }
                    System.out.println();
                }
            });

        }
        super.setProperty(propertyName, propertyType, propertyValue);
    }

    public double[] getNbCalls() {
        return new double[]{};
    }



    public static class SensorNodeFactory implements NodeFactory {
        @Override
        public String name() {
            return NAME;
        }

        @Override
        public Node create(long world, long time, long id, Graph graph, long[] initialResolution) {
            return new SensorNode(world, time, id, graph, initialResolution);
        }
    }
}
