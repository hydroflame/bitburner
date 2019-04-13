getScriptIncome() Netscript Function
====================================

.. js:function:: getScriptIncome([scriptname], [hostname/ip], [args...])

    :param string scriptname: Filename of script
    :param string hostname/ip: Server on which script is running
    :param args...: Arguments that the script is running with
    :RAM cost: 0.1 GB

    Returns the amount of income the specified script generates while online (when the game is open, does not apply for offline income).
    Remember that a script is uniquely identified by both its name and its arguments. So for example if you ran a script with the arguments
    "foodnstuff" and "5" then in order to use this function to get that script's income you must specify those same arguments in the same order
    in this function call.

    This function can also be called with no arguments. If called with no arguments, then this function will return an array of two values. The
    first value is the total income ($ / second) of all of your active scripts (scripts that are currently running on any server). The second value
    is the total income ($ / second) that you've earned from scripts since you last installed Augmentations.