package models_test

import (
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/testdatagen"

	"github.com/gobuffalo/uuid"
)

func (suite *ModelSuite) Test_UploadCreate() {
	t := suite.T()

	move, err := testdatagen.MakeMove(suite.db)
	if err != nil {
		t.Fatalf("could not create move: %v", err)
	}

	document := models.Document{
		UploaderID: move.UserID,
		MoveID:     move.ID,
	}
	suite.mustSave(&document)

	upload := models.Upload{
		DocumentID:  document.ID,
		UploaderID:  move.UserID,
		Filename:    "test.pdf",
		Bytes:       1048576,
		ContentType: "application/pdf",
		Checksum:    "ImGQ2Ush0bDHsaQthV5BnQ==",
	}

	verrs, err := suite.db.ValidateAndSave(&upload)

	if err != nil {
		t.Fatalf("could not save Upload: %v", err)
	}

	if verrs.Count() != 0 {
		t.Errorf("did not expect validation errors: %v", verrs)
	}
}

func (suite *ModelSuite) Test_UploadCreateWithID() {
	t := suite.T()

	move, err := testdatagen.MakeMove(suite.db)
	if err != nil {
		t.Fatalf("could not create move: %v", err)
	}

	document := models.Document{
		UploaderID: move.UserID,
		MoveID:     move.ID,
	}
	suite.mustSave(&document)

	id := uuid.Must(uuid.NewV4())
	upload := models.Upload{
		ID:          id,
		DocumentID:  document.ID,
		UploaderID:  move.UserID,
		Filename:    "test.pdf",
		Bytes:       1048576,
		ContentType: "application/pdf",
		Checksum:    "ImGQ2Ush0bDHsaQthV5BnQ==",
	}

	verrs, err := suite.db.ValidateAndSave(&upload)

	if err != nil {
		t.Fatalf("could not save Upload: %v", err)
	}

	if verrs.Count() != 0 {
		t.Errorf("did not expect validation errors: %v", verrs)
	}

	if upload.ID.String() != id.String() {
		t.Errorf("wrong uuid for upload: expected %s, got %s", id.String(), upload.ID.String())
	}
}

func (suite *ModelSuite) Test_UploadValidations() {
	upload := &models.Upload{}

	var expErrors = map[string][]string{
		"document_id":  {"DocumentID can not be blank."},
		"uploader_id":  {"UploaderID can not be blank."},
		"checksum":     {"Checksum can not be blank."},
		"bytes":        {"Bytes can not be blank."},
		"filename":     {"Filename can not be blank."},
		"content_type": {"ContentType can not be blank."},
	}

	suite.verifyValidationErrors(upload, expErrors)
}
