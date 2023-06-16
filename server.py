from flask import Flask, jsonify, request
from neo4j import GraphDatabase

app = Flask(__name__)

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "zaq1@WSX"))

@app.route('/betweenness', methods=['GET'])
def betweenness():
    with driver.session() as session:
        result = session.run("""
            CALL gds.betweenness.stream("deezer")
            YIELD nodeId, score
            RETURN nodeId, score
            ORDER BY score DESC
            """)
        return jsonify([dict(record) for record in result])


@app.route('/shortest_path', methods=['GET'])
def shortest_path():
    start_node = request.args.get('start_node')
    end_node = request.args.get('end_node')
    with driver.session() as session:
        result = session.run("""
            CALL gds.shortestPath.dijkstra.stream("deezer",
                sourceNode: $start_node,
                targetNode: $end_node
            })
            YIELD nodeIds
            RETURN nodeIds"""
        , {"start_node": start_node, "end_node": end_node})
        return jsonify([dict(record) for record in result])
    

@app.route('/pagerank', methods=['GET'])
def pagerank():
    with driver.session() as session:
        result = session.run("""
            CALL gds.pageRank.stream("deezer")
            YIELD nodeId, score
            RETURN nodeId, score
            ORDER BY score DESC
        """)
        return jsonify([dict(record) for record in result])

@app.route('/louvain', methods=['GET'])
def louvain():
    with driver.session() as session:
        result = session.run("""
            CALL gds.louvain.stream("deezer")
            YIELD nodeId, communityId
            RETURN nodeId, communityId
            ORDER BY communityId DESC
        """)
        return jsonify([dict(record) for record in result])

@app.route('/clustering_coefficient', methods=['GET'])
def clustering_coefficient():
    with driver.session() as session:
        result = session.run("""
            CALL gds.localClusteringCoefficient.stream("deezer")
            YIELD nodeId, localClusteringCoefficient
            RETURN nodeId, localClusteringCoefficient
        """)
        return jsonify([dict(record) for record in result])


@app.route('/scc', methods=['GET'])
def scc():
    with driver.session() as session:
        result = session.run("""
            CALL gds.localClusteringCoefficient.stream("deezer")
            YIELD nodeId, localClusteringCoefficient
            RETURN nodeId, localClusteringCoefficient
        """)
        return jsonify([dict(record) for record in result])

if __name__ == "__main__":
    app.run(port=5000)
