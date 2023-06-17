CALL gds.localClusteringCoefficient.stream("graph")
YIELD nodeId, localClusteringCoefficient
RETURN nodeId, localClusteringCoefficient
