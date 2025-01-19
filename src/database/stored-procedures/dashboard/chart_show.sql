#
# DROP PROCEDURE IF EXISTS sp_get_chart_data;
# CREATE PROCEDURE sp_get_chart_data()
# BEGIN
# #     -- 1. Incidents by Severity
# #     SELECT
# #         severity,
# #         COUNT(*) AS incidentCount
# #     FROM
# #         tbl_incident
# #     GROUP BY
# #         severity;
# #
# #     -- 2. Incidents by Status
# #     SELECT
# #         incidentStatus,
# #         COUNT(*) AS incidentCount
# #     FROM
# #         tbl_incident
# #     GROUP BY
# #         incidentStatus;
# #
# #     -- 3. Incident Trends Over Time
# #     SELECT
# #         DATE(time) AS incidentDate,
# #         COUNT(*) AS incidentCount
# #     FROM
# #         tbl_incident
# #     GROUP BY
# #         DATE(time)
# #     ORDER BY
# #         incidentDate;
# #
# #     -- 4. History Updates per Incident
# #     SELECT
# #         i.id AS incidentId,
# #         COUNT(h.id) AS historyCount
# #     FROM
# #         tbl_incident i
# #             LEFT JOIN
# #         tbl_incident_history h ON i.id = h.incidentId
# #     GROUP BY
# #         i.id
# #     ORDER BY
# #         historyCount DESC;
# #
# #     -- 5. Incidents by Device and Severity
# #     SELECT
# #         d.type,  -- Assuming tbl_device has a deviceName column
# #         i.severity,
# #         COUNT(*) AS incidentCount
# #     FROM
# #         tbl_incident i
# #             LEFT JOIN
# #         tbl_device d ON i.deviceId = d.id
# #     GROUP BY
# #         d.type, i.severity
# #     ORDER BY
# #         d.type, i.severity;
# #
# #     -- 6. Status Changes Over Time
# #     SELECT
# #         DATE(h.createdAt) AS historyDate,
# #         COUNT(*) AS changesCount
# #     FROM
# #         tbl_incident_history h
# #     GROUP BY
# #         DATE(h.createdAt)
# #     ORDER BY
# #         historyDate;
#
#     -- 7. Summary Dashboard Data
#     SELECT
#         (SELECT COUNT(*) FROM tbl_incident) AS totalIncidents,
#         (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'pending') AS openIncidents,
#         (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'resolve') AS closedIncidents,
#         (SELECT COUNT(*) FROM tbl_incident WHERE incidentStatus = 'active') AS active;
# END;
