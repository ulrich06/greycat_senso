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
        final static int SLOTS = 12;
        private static final String NAME = "SensorNode";

        private int calls = 0;

        private SensorNode(long p_world, long p_time, long p_id, Graph p_graph, long[] currentResolution) {
            super(p_world, p_time, p_id, p_graph, currentResolution);
        }

        @Override
        public Object get(String propertyName) {
            final NodeState state = _resolver.resolveState(this, true);
            if ("value".equals(propertyName) && state.time() > 0L){
                if (state.getFromKey("profileUsage") == null){
                    // create if not exist
                    Node profileUsage = graph().newTypedNode(0, 0, GaussianSlotProfilingNode.NAME);
                    profileUsage.set(GaussianSlotProfilingNode.SLOTS_NUMBER, SLOTS);
                    add("profileUsage", profileUsage);
                }
                rel("profileUsage", new Callback<Node[]>() {
                    @Override
                    public void on(Node[] result) {
                        GaussianSlotProfilingNode profiler = ((GaussianSlotProfilingNode) result[0]);

                                if (profiler.getTotal() != null){
                                    System.out.println("cas 1");
                                    System.out.println("Before: " + profiler.getSum()[0]);
                                    profiler.learnArray(new double[]{1.0 + profiler.getSum()[0]});
                                    System.out.println("After: " + profiler.getSum()[0]);

                                } else {
                                    System.out.println("cas 2");
                                    System.out.println("Before: null");
                                    profiler.learnArray(new double[]{1.0});
                                    System.out.println("After: " + profiler.getSum()[0]);
                                }
                                //System.out.println("training - previous " + ((GaussianSlotProfilingNode) result).getTotal()[0]);
                                //((GaussianSlotProfilingNode) result).learnArray(new double[]{((GaussianSlotProfilingNode) result).getTotal()[0] + 1.0});
                                //System.out.println("training - after " + ((GaussianSlotProfilingNode) result).getTotal()[0]);
                            }
                        });

                    }

            return super.get(propertyName);
        }

        public int getNbCalls() {
            return calls;
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
