DROP PROCEDURE IF EXISTS sp_get_chart_data;
CREATE PROCEDURE sp_get_chart_data()
BEGIN
    SELECT (SELECT COUNT(*) FROM tbl_incident)                                  AS totalIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'pending') AS openIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'resolve') AS closedIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'active')  AS activeIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE severity = 'high')          AS highIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE severity = 'low')           AS lowIncidents,
           (SELECT COUNT(*) FROM tbl_incident WHERE severity = 'medium')        AS mediumIncidents,
           (SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                                   'month', month,
                                   'incidentHistoryCount', incidentHistoryCount
                           )
                   ) AS incidentHistoryByMonth
            FROM (SELECT DATE_FORMAT(createdAt, '%Y-%m') AS month,
                         COUNT(*)                        AS incidentHistoryCount
                  FROM tbl_incident_history
                  WHERE createdAt >= CURDATE() - INTERVAL 12 MONTH
                  GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
                  ORDER BY month) AS monthlyData) As data ;


END;
