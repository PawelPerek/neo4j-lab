$(() => {
    let neoViz;

    const config = {
        containerId: "viz",
        neo4j: {
            serverUrl: "bolt://localhost:7687",
            serverUser: "neo4j",
            serverPassword: "zaq1@WSX",
        },
        labels: {
            Node: {
                label: "score",
                [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                    function: {
                        title: (NeoVis.objectToTitleHtml)
                    }
                }
            }
        },
        initialCypher: "MATCH (n)-[r]->(m) RETURN * LIMIT 500"
    };

    neoViz = new NeoVis.default(config);
    neoViz.render();

    $("#reload").click(function () {
        var cypher = $("#cypher").val();

        if (cypher.length > 3) {
            neoViz.renderWithCypher(cypher);
        } else {
            console.log("reload");
            neoViz.reload();
        }
    });

    $("#show-all").click(() => {
        $("#cypher").val(`
            MATCH (n)-[r]->(m) RETURN * LIMIT 500
        `)
    })

    $("#djikstra").click(() => {
        $("#cypher").val(`
            MATCH (source: Node {id: 80}), (target: Node {id: 38})
            CALL gds.shortestPath.dijkstra.stream("graph", {
                sourceNode: id(source),
                targetNode: id(target)
            })
            YIELD nodeIds
            UNWIND range(0, size(nodeIds)-2) as idx
            MATCH (n1) WHERE id(n1) = nodeIds[idx]
            MATCH (n2) WHERE id(n2) = nodeIds[idx+1]
            MATCH path = (n1)-[*..1]-(n2)
            RETURN path
        `)
    })

    $("#page-rank").click(() => {
        $("#cypher").val(`
            CALL gds.pageRank.stream("graph")
            YIELD nodeId, score
            MATCH (n) WHERE id(n) = nodeId
            RETURN n, score
            ORDER BY score DESC
            LIMIT 100
        `)
    })

    $("#scc").click(() => {
        $("#cypher").val(`
            CALL gds.alpha.scc.stream("graph")
            YIELD nodeId, componentId
            MATCH (n) WHERE id(n) = nodeId
            RETURN n, componentId
            ORDER BY componentId DESC
            LIMIT 100
        `)
    })

    $("#cc").click(() => {
        $("#cypher").val(`
            CALL gds.localClusteringCoefficient.stream("graph")
            YIELD nodeId, localClusteringCoefficient
            MATCH (n) WHERE id(n) = nodeId
            RETURN n, localClusteringCoefficient
            ORDER BY localClusteringCoefficient DESC
            LIMIT 100
        `)
    })

    $("#bc").click(() => {
        $("#cypher").val(`
            CALL gds.betweenness.stream("graph", { samplingSize: 20 })
            YIELD nodeId, score
            MATCH (n) WHERE id(n) = nodeId
            RETURN n, score
            ORDER BY score DESC
            LIMIT 100
        `)
    })
})
