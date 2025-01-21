DROP PROCEDURE IF EXISTS `accident_detection_DB`.`incident_get`;
CREATE PROCEDURE `accident_detection_DB`.`incident_get`(
    IN incidentId_val INT
)
BEGIN

    SELECT location
    INTO @location
    FROM tbl_incident
    WHERE id = incidentId_val;

    SELECT
        tn.id AS id,
        tn.severity AS severity,
        tn.location AS location,
        tn.time AS incidentTime,
        tn.incidentStatus AS incidentStatus,
        JSON_OBJECT(
                'id', td.id,
                'deviceId', td.deviceId,
                'type', td.type,
                'deviceStatus', td.deviceStatus,
                'lastMaintenance', td.lastMaintenance,
                'vehicleId', td.vehicleId,
                'userId', td.userId
        ) AS device,
        JSON_OBJECT(
                'id', tv.id,
                'vehicleNumber', tv.vehicleNumber,
                'manufactureYear', tv.manufactureYear,
                'vehicleType', tv.vehicleType,
                'model', tv.model
        ) AS vehicle,
        JSON_OBJECT(
                'id', tu.id,
                'userName', tu.userName,
                'fullName', tu.fullName,
                'nic', tu.nic,
                'contactNumber', tu.contactNumber,
                'gender', tu.gender,
                'city', tu.city,
                'district', tu.district,
                'province', tu.province,
                'userStatus', tu.userStatus,
                'email', tu.email
        ) AS user,
        -- Fetch fire, hospital, and police services as JSON objects
        JSON_OBJECT(
                'id', tf.id,
                'fireCode', tf.fireCode,
                'fireName', tf.fireName,
                'contactNumber', tf.contactNumber,
                'city', tf.city,
                'district', tf.district,
                'province', tf.province,
                'areaCovered', tf.areaCovered,
                'location', tf.location
        ) AS fire,
        JSON_OBJECT(
                'id', th.id,
                'hospitalCode', th.hospitalCode,
                'hospitalName', th.hospitalName,
                'contactNumber', th.contactNumber,
                'city', th.city,
                'district', th.district,
                'province', th.province,
                'areaCovered', th.areaCovered,
                'location', th.location
        ) AS hospital,
        JSON_OBJECT(
                'id', tp.id,
                'policeCode', tp.policeCode,
                'policeName', tp.policeName,
                'contactNumber', tp.contactNumber,
                'city', tp.city,
                'district', tp.district,
                'province', tp.province,
                'areaCovered', tp.areaCovered,
                'location', tp.location
        ) AS police,
        -- Fetch emergency person details as JSON objects
        JSON_OBJECT(
                'id', ep.id,
                'personName', ep.personName,
                'relation', ep.relation,
                'address', ep.address,
                'nic', ep.nic,
                'contactNumber', ep.contactNumber,
                'email', ep.email,
                'gender', ep.gender
        ) AS emergencyPerson
    FROM
        tbl_incident tn
            LEFT JOIN tbl_device td ON tn.deviceId = td.id
            LEFT JOIN tbl_vehicle tv ON td.vehicleId = tv.id
            LEFT JOIN tbl_user tu ON td.userId = tu.id
            LEFT JOIN tbl_fire tf ON tn.location LIKE CONCAT('%', tf.location, '%')
            LEFT JOIN tbl_hospital th ON tn.location LIKE CONCAT('%', th.location, '%')
            LEFT JOIN tbl_police tp ON tn.location LIKE CONCAT('%', tp.location, '%')
            LEFT JOIN tbl_emergency_person ep ON tu.id = ep.userId
    WHERE tn.id = incidentId_val;


    COMMIT;
END
