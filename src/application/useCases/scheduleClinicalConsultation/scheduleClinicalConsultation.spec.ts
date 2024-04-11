import ScheduleClinicalConsultation from './scheduleClinicalConsultation';
import type ClinicalConsultationRepository from '@application/repositories/ClinicalConsultationRepository';
import type ClinicalConsultation from '@entities/clinicalConsultation';

const fakeClinicalConsultationRepository: ClinicalConsultationRepository = {
  create: async (clinicalConsultation: ClinicalConsultation) => {},
};

test('Create a Clinical Consultation', async () => {
  const appointment = new ScheduleClinicalConsultation(
    fakeClinicalConsultationRepository,
  );
  const response = await appointment.execute({
    clinicianId: '1',
    patientId: '1',
    room: 1,
    appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0)),
  });

  expect(response.appointmentDate.toISOString()).toEqual(
    '2021-01-01T00:00:00.000Z',
  );
});
