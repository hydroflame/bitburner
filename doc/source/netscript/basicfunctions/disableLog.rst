disableLog() Netscript Function
===============================

.. js:function:: disableLog(functionName)

    :RAM cost: 0 GB

    :param string functionName: Name of function for which to disable logging.

    Disables logging for the given function. Logging can be disabled for
    all functions by passing 'ALL' as the argument.

    Note that this does not completely remove all logging functionality.
    This only stops a function from logging when the function is successful. If
    the function fails, it will still log the reason for failure.

    Notable functions that cannot have their logs disabled: run, exec, exit
