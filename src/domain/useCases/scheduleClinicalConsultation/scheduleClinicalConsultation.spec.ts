import { expect, test } from 'vitest';
import scheduleClinicalConsultation from './scheduleClinicalConsultation';
import ClinicalConsultationRepository from '../../repositories/ClinicalConsultationRepository';
import ClinicalConsultation from '../../entities/clinicalConsultation';

const fakeClinicalConsultationRepository: ClinicalConsultationRepository = {
    create: async (clinicalConsultation: ClinicalConsultation) => {
        return;
    }
}

test('Create a Clinical Consultation', async () => {
    const appointment = new scheduleClinicalConsultation(fakeClinicalConsultationRepository)
    const response = await appointment.execute({
        clinicianId: '1',
        patientId: '1',
        appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0))
    })

    expect(response.appointmentDate.toISOString()).toEqual('2021-01-01T00:00:00.000Z')
});
