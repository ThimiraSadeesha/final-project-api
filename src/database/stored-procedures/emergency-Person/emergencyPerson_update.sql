DROP PROCEDURE IF EXISTS `accident_detection_DB`.`emergency_person_update`;
CREATE PROCEDURE `accident_detection_DB`.`emergency_person_update`(
    IN id_val INT,
    IN personName_val VARCHAR(255),
    IN relation_val VARCHAR(50),
    IN address_val VARCHAR(255),
    IN nic_val VARCHAR(15),
    IN contactNumber_val VARCHAR(20),
    IN email_val VARCHAR(50),
    IN gender_val VARCHAR(10)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
            SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
            ROLLBACK;
        END;

    START TRANSACTION;

    UPDATE tbl_emergency_person
    SET
        personName = personName_val,
        relation = relation_val,
        address = address_val,
        nic = nic_val,
        contactNumber = contactNumber_val,
        email = email_val,
        gender = gender_val
    WHERE
        id = id_val;

    COMMIT;

    SET @InsertedID = LAST_INSERT_ID();
    CALL emergency_person_get(@InsertedID);
END
