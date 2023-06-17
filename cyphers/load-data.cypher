:auto LOAD CSV WITH HEADERS FROM 'file:///HR_edges.csv' AS line
CALL {
    WITH line
    MERGE (n:Node {id: toInteger(line.node_1)})
    MERGE (m:Node {id: toInteger(line.node_2)})
    MERGE (n)-[:CONNECTS_TO]-(m)
} IN TRANSACTIONS