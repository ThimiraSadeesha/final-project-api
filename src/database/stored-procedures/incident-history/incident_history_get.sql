DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_history_get`;
CREATE PROCEDURE `accident_detection_DB`.`incident_history_get`(
    IN id_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
    END;

START TRANSACTION;

SELECT
    th.id AS historyId,
    th.createdAt AS createdAt,
    (
        SELECT JSON_OBJECT(
                       'id', ti.id,
                       'severity', ti.severity,
                       'location', ti.location,
                       'incidentTime', ti.time,
                       'incidentStatus', ti.incidentStatus,
                       'device', ti.deviceId
               )
        FROM tbl_incident ti
        WHERE ti.id = th.incidentId
    ) AS incident_details
FROM tbl_incident_history th
WHERE th.id = id_val;

COMMIT;
END;
