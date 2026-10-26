import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from './contactValidation';

test('validateContactForm: detects empty fields', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm: catches malformed email', () => {
  const result = validateContactForm({
    name: 'Dev Tester',
    email: 'not-an-email',
    subject: 'Project Inquiry',
    message: 'Hello, I would like to discuss an opportunity.'
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
  assert.equal(result.errors.name, undefined);
});

test('validateContactForm: passes valid submission', () => {
  const result = validateContactForm({
    name: 'Recruiter / Engineer',
    email: 'recruiter@techcompany.com',
    subject: 'Full-Stack Internship 2026',
    message: 'We were impressed by your ResQ 2.0 and Day Night GymOS case studies!'
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});
