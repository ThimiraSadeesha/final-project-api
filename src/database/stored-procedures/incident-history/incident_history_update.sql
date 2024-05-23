DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_history_update`;
CREATE PROCEDURE `accident_detection_DB`.`incident_history_update`(
    IN p_historyId INT,
    IN p_incidentId INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        ROLLBACK;
    END;

START TRANSACTION;

    UPDATE tbl_incident_history th
    SET
        th.incidentId = p_incidentId
    WHERE  th.id = p_historyId;

COMMIT;

SET @InsertedID = LAST_INSERT_ID();
CALL incident_history_get(@InsertedID);
END