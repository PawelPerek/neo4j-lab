CALL gds.alpha.scc.stream("graph")
YIELD nodeId, componentId
RETURN nodeId, componentId
ORDER BY componentId