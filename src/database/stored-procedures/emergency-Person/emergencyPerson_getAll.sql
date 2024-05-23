DROP PROCEDURE IF EXISTS `accident_detection_DB`.`emergency_person_getAll`;
CREATE PROCEDURE `accident_detection_DB`.`emergency_person_getAll`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
                GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @message_text = MESSAGE_TEXT;
                SELECT CONCAT('Error: [', @sqlstate, '] ', @message_text) AS error_message;
        END;

SELECT id            AS id,
       personName    AS fullName,
       relation      AS relationship,
       address       AS addredd,
       nic           AS nic,
       contactNumber AS mobileNumber,
       email         AS email,
       gender        AS gender
FROM tbl_emergency_person;

END

