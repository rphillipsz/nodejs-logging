// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * An individual entry in a log.
 *
 * @property {string} logName
 *   Required. The resource name of the log to which this log entry belongs:
 *
 *       "projects/[PROJECT_ID]/logs/[LOG_ID]"
 *       "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
 *       "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
 *       "folders/[FOLDER_ID]/logs/[LOG_ID]"
 *
 *   A project number may optionally be used in place of PROJECT_ID. The project
 *   number is translated to its corresponding PROJECT_ID internally and the
 *   `log_name` field will contain PROJECT_ID in queries and exports.
 *
 *   `[LOG_ID]` must be URL-encoded within `log_name`. Example:
 *   `"organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity"`.
 *   `[LOG_ID]` must be less than 512 characters long and can only include the
 *   following characters: upper and lower case alphanumeric characters,
 *   forward-slash, underscore, hyphen, and period.
 *
 *   For backward compatibility, if `log_name` begins with a forward-slash, such
 *   as `/projects/...`, then the log entry is ingested as usual but the
 *   forward-slash is removed. Listing the log entry will not show the leading
 *   slash and filtering for a log name with a leading slash will never return
 *   any results.
 *
 * @property {Object} resource
 *   Required. The monitored resource that produced this log entry.
 *
 *   Example: a log entry that reports a database error would be associated with
 *   the monitored resource designating the particular database that reported
 *   the error.
 *
 *   This object should have the same structure as [MonitoredResource]{@link google.api.MonitoredResource}
 *
 * @property {Object} protoPayload
 *   The log entry payload, represented as a protocol buffer. Some Google
 *   Cloud Platform services use this field for their log entry payloads.
 *
 *   The following protocol buffer types are supported; user-defined types
 *   are not supported:
 *
 *     "type.googleapis.com/google.cloud.audit.AuditLog"
 *     "type.googleapis.com/google.appengine.logging.v1.RequestLog"
 *
 *   This object should have the same structure as [Any]{@link google.protobuf.Any}
 *
 * @property {string} textPayload
 *   The log entry payload, represented as a Unicode string (UTF-8).
 *
 * @property {Object} jsonPayload
 *   The log entry payload, represented as a structure that is
 *   expressed as a JSON object.
 *
 *   This object should have the same structure as [Struct]{@link google.protobuf.Struct}
 *
 * @property {Object} timestamp
 *   Optional. The time the event described by the log entry occurred.  This
 *   time is used to compute the log entry's age and to enforce the logs
 *   retention period. If this field is omitted in a new log entry, then Logging
 *   assigns it the current time.  Timestamps have nanosecond accuracy, but
 *   trailing zeros in the fractional seconds might be omitted when the
 *   timestamp is displayed.
 *
 *   Incoming log entries should have timestamps that are no more than the [logs
 *   retention period](https://cloud.google.com/logging/quotas) in the past, and no more than 24 hours
 *   in the future. Log entries outside those time boundaries will not be
 *   available when calling `entries.list`, but those log entries can still be
 *   [exported with LogSinks](https://cloud.google.com/logging/docs/api/tasks/exporting-logs).
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} receiveTimestamp
 *   Output only. The time the log entry was received by Logging.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {number} severity
 *   Optional. The severity of the log entry. The default value is
 *   `LogSeverity.DEFAULT`.
 *
 *   The number should be among the values of [LogSeverity]{@link google.logging.type.LogSeverity}
 *
 * @property {string} insertId
 *   Optional. A unique identifier for the log entry. If you provide a value,
 *   then Logging considers other log entries in the same project, with the same
 *   `timestamp`, and with the same `insert_id` to be duplicates which can be
 *   removed. If omitted in new log entries, then Logging assigns its own unique
 *   identifier. The `insert_id` is also used to order log entries that have the
 *   same `timestamp` value.
 *
 * @property {Object} httpRequest
 *   Optional. Information about the HTTP request associated with this log
 *   entry, if applicable.
 *
 *   This object should have the same structure as [HttpRequest]{@link google.logging.type.HttpRequest}
 *
 * @property {Object.<string, string>} labels
 *   Optional. A set of user-defined (key, value) data that provides additional
 *   information about the log entry.
 *
 * @property {Object} metadata
 *   Deprecated. Output only. Additional metadata about the monitored resource.
 *
 *   Only `k8s_container`, `k8s_pod`, and `k8s_node` MonitoredResources have
 *   this field populated for GKE versions older than 1.12.6. For GKE versions
 *   1.12.6 and above, the `metadata` field has been deprecated. The Kubernetes
 *   pod labels that used to be in `metadata.userLabels` will now be present in
 *   the `labels` field with a key prefix of `k8s-pod/`. The Stackdriver system
 *   labels that were present in the `metadata.systemLabels` field will no
 *   longer be available in the LogEntry.
 *
 *   This object should have the same structure as [MonitoredResourceMetadata]{@link google.api.MonitoredResourceMetadata}
 *
 * @property {Object} operation
 *   Optional. Information about an operation associated with the log entry, if
 *   applicable.
 *
 *   This object should have the same structure as [LogEntryOperation]{@link google.logging.v2.LogEntryOperation}
 *
 * @property {string} trace
 *   Optional. Resource name of the trace associated with the log entry, if any.
 *   If it contains a relative resource name, the name is assumed to be relative
 *   to `//tracing.googleapis.com`. Example:
 *   `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824`
 *
 * @property {string} spanId
 *   Optional. The span ID within the trace associated with the log entry.
 *
 *   For Trace spans, this is the same format that the Trace API v2 uses: a
 *   16-character hexadecimal encoding of an 8-byte array, such as
 *   <code>"000000000000004a"</code>.
 *
 * @property {boolean} traceSampled
 *   Optional. The sampling decision of the trace associated with the log entry.
 *
 *   True means that the trace resource name in the `trace` field was sampled
 *   for storage in a trace backend. False means that the trace was not sampled
 *   for storage when this log entry was written, or the sampling decision was
 *   unknown at the time. A non-sampled `trace` value is still useful as a
 *   request correlation identifier. The default is False.
 *
 * @property {Object} sourceLocation
 *   Optional. Source code location information associated with the log entry,
 *   if any.
 *
 *   This object should have the same structure as [LogEntrySourceLocation]{@link google.logging.v2.LogEntrySourceLocation}
 *
 * @typedef LogEntry
 * @memberof google.logging.v2
 * @see [google.logging.v2.LogEntry definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/logging/v2/log_entry.proto}
 */
const LogEntry = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Additional information about a potentially long-running operation with which
 * a log entry is associated.
 *
 * @property {string} id
 *   Optional. An arbitrary operation identifier. Log entries with the same
 *   identifier are assumed to be part of the same operation.
 *
 * @property {string} producer
 *   Optional. An arbitrary producer identifier. The combination of `id` and
 *   `producer` must be globally unique. Examples for `producer`:
 *   `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`.
 *
 * @property {boolean} first
 *   Optional. Set this to True if this is the first log entry in the operation.
 *
 * @property {boolean} last
 *   Optional. Set this to True if this is the last log entry in the operation.
 *
 * @typedef LogEntryOperation
 * @memberof google.logging.v2
 * @see [google.logging.v2.LogEntryOperation definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/logging/v2/log_entry.proto}
 */
const LogEntryOperation = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Additional information about the source code location that produced the log
 * entry.
 *
 * @property {string} file
 *   Optional. Source file name. Depending on the runtime environment, this
 *   might be a simple name or a fully-qualified name.
 *
 * @property {number} line
 *   Optional. Line within the source file. 1-based; 0 indicates no line number
 *   available.
 *
 * @property {string} function
 *   Optional. Human-readable name of the function or method being invoked, with
 *   optional context such as the class or package name. This information may be
 *   used in contexts such as the logs viewer, where a file and line number are
 *   less meaningful. The format can vary by language. For example:
 *   `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function`
 *   (Python).
 *
 * @typedef LogEntrySourceLocation
 * @memberof google.logging.v2
 * @see [google.logging.v2.LogEntrySourceLocation definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/logging/v2/log_entry.proto}
 */
const LogEntrySourceLocation = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};