CALL gds.pageRank.stream("graph")
YIELD nodeId, score
MATCH (n) WHERE id(n) = nodeId
RETURN n, score
ORDER BY score DESC
LIMIT 100
