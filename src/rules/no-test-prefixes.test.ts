import { TSESLint } from '@typescript-eslint/utils'
import { describe, test } from 'vitest'
import rule, { RULE_NAME } from './no-test-prefixes'

const ruleTester = new TSESLint.RuleTester({
	parser: require.resolve('@typescript-eslint/parser')
})

describe(RULE_NAME, () => {
	test(RULE_NAME, () => {
		ruleTester.run(RULE_NAME, rule, {
			valid: [
				'describe("foo", function () {})',
				'it("foo", function () {})',
				'it.concurrent("foo", function () {})',
				'test("foo", function () {})',
				'test.concurrent("foo", function () {})',
				'describe.only("foo", function () {})',
				'it.only("foo", function () {})',
				'it.each()("foo", function () {})'
			],
			invalid: [
				{
					code: 'fdescribe("foo", function () {})',
					output: 'describe.only("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'describe.only' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xdescribe.each([])("foo", function () {})',
					output: 'describe.skip.each([])("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'describe.skip.each' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'fit("foo", function () {})',
					output: 'it.only("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'it.only' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xdescribe("foo", function () {})',
					output: 'describe.skip("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'describe.skip' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xit("foo", function () {})',
					output: 'it.skip("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'it.skip' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xtest("foo", function () {})',
					output: 'test.skip("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'test.skip' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xit.each``("foo", function () {})',
					output: 'it.skip.each``("foo", function () {})',
					parserOptions: { ecmaVersion: 6 },
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'it.skip.each' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xtest.each``("foo", function () {})',
					output: 'test.skip.each``("foo", function () {})',
					parserOptions: { ecmaVersion: 6 },
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'test.skip.each' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xit.each([])("foo", function () {})',
					output: 'it.skip.each([])("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'it.skip.each' },
							column: 1,
							line: 1
						}
					]
				},
				{
					code: 'xtest.each([])("foo", function () {})',
					output: 'test.skip.each([])("foo", function () {})',
					errors: [
						{
							messageId: 'usePreferredName',
							data: { preferredNodeName: 'test.skip.each' },
							column: 1,
							line: 1
						}
					]
				}
			]
		})
	})
})
