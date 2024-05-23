DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_history_save`;
CREATE PROCEDURE `accident_detection_DB`.`incident_history_save`(

    IN incident_val INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
        SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        ROLLBACK;
    END;

START TRANSACTION;
    INSERT INTO tbl_incident_history (incidentId)
    VALUES (incident_val);
COMMIT;
    SET @InsertedID = LAST_INSERT_ID();
    CALL incident_history_get(@InsertedID);
END;