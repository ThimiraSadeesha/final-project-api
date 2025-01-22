DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_update`;
CREATE PROCEDURE `accident_detection_DB`.`incident_update`(
    IN p_id INT,
    IN hos_id INT,
    IN pos_id INT,
    IN fir_id INT,
    IN p_incidentStatus VARCHAR(15)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
        END;

    START TRANSACTION;

    UPDATE tbl_incident
    SET updatedAt      = CURRENT_TIMESTAMP,
        incidentStatus = p_incidentStatus
    WHERE id = p_id;

    IF p_incidentStatus = 'resolve' THEN
        INSERT INTO tbl_incident_history (incidentId)
        VALUES (p_id);

        INSERT INTO tbl_response (responseStatus, responseTime, incidentId, policeDepartmentId, fireDepartmentId,
                                  hospitalDepartmentId)
        VALUES ('resolve', CURRENT_TIMESTAMP, p_id, pos_id,
                fir_id, hos_id);

    end if;


    select p_id As UpdatedId;
    COMMIT;
END