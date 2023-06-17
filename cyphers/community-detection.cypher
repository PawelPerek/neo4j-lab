CALL gds.louvain.stream("graphs")
YIELD nodeId, communityId
RETURN nodeId, communityId
ORDER BY communityId DESC
