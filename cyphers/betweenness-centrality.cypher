CALL gds.betweenness.stream("graph")
YIELD nodeId, score
RETURN nodeId AS node, score
ORDER BY score DESC