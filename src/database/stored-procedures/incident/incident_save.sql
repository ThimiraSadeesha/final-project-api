DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_save`;
CREATE PROCEDURE `accident_detection_DB`.`incident_save`(
    IN p_severity VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_incidentStatus VARCHAR(15),
    IN p_deviceId INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        ROLLBACK;
    END;

START TRANSACTION;

    INSERT INTO tbl_incident (severity, location, time, incidentStatus,deviceId)
    VALUES (p_severity, p_location, CURRENT_TIMESTAMP, p_incidentStatus, p_deviceId);

    COMMIT;
    SET @InsertedID = LAST_INSERT_ID();
    CALL incident_get(@InsertedID);
END;